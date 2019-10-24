from django.shortcuts import get_object_or_404
from django.conf import settings

from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework import status, generics, viewsets
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.filters import SearchFilter

from django_filters.rest_framework import DjangoFilterBackend

import accounts.models as models
from accounts.serializers import UserSerializer, UserLoginSerializer, DeviceSerializer, UserManageSerializer, \
    MembershipSerializer, MembershipSummarySerializer
from lib.utils import AtomicMixin
from .twilio import Twilio
import random
from datetime import datetime, timedelta
from pytz import timezone
from django.core.mail import EmailMessage
from django.template.loader import get_template
from lib.core import CustomPageNumberPagination
from .models import User

twilio = Twilio()


class UserRegisterView(AtomicMixin, CreateModelMixin, generics.GenericAPIView):
    serializer_class = UserSerializer
    authentication_classes = ()

    def post(self, request):
        """models.User registration view."""
        return self.create(request)

    def perform_create(self, serializer):
        serializer.save()
        msg = EmailMessage(
            '验证',
            get_template('email_confirmation.html').render({
                'activation_key': serializer.instance.activation_key,
                'domain': 'http://localhost:8000',
                'username': serializer.instance.name
            }),
            to=[serializer.instance.email]
        )
        msg.content_subtype = 'html'
        msg.send()


class UserUpdateView(generics.UpdateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    lookup_field = 'id'

    def get_serializer(self, *args, **kwargs):
        if self.request.user.is_superuser:
            return UserManageSerializer
        else:
            return UserSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return models.User.objects.all()
        else:
            return models.User.objects.filter(id=self.kwargs.get('id'))

    def update(self, request, *args, **kwargs):
        if request.user.email == request.data.get('email'):
            request.data.update({
                'email': 'panda109_{}'.format(request.data.get('email'))
            })
        serializer = self.serializer_class(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserLoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })


class UserConfirmEmailView(AtomicMixin, generics.GenericAPIView):
    serializer_class = None
    authentication_classes = ()

    def get(self, request, activation_key):
        """
        View for confirm email.

        Receive an activation key as parameter and confirm email.
        """
        user = get_object_or_404(models.User, activation_key=str(activation_key))
        if user.confirm_email():
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_404_NOT_FOUND)


class UserEmailConfirmationStatusView(generics.GenericAPIView):
    serializer_class = None
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    @staticmethod
    def get(request):
        """Retrieve user current confirmed_email status."""
        user = request.user
        return Response({'status': user.confirmed_email}, status=status.HTTP_200_OK)


class DeviceView(generics.GenericAPIView):
    serializer_class = DeviceSerializer
    authentication_classes = ()

    @staticmethod
    def post(request):
        token = str(random.randint(1, 1000000)).zfill(6)
        error_message = None

        try:
            phone_number = request.data.get('phone_number')
            if not phone_number:
                error_message = '请输入电话号码'
                raise Exception(error_message)

            message = twilio.send_sms(phone_number, token)

            if not message:
                error_message = '电话号码不正确'
                raise Exception('电话号码不正确')

            device = models.Device.objects.create(sms_code=token, phone_number=phone_number)

            res_data = {
                'status': True,
                'phone_number': device.phone_number,
                'message': '请检查你的手机',
                'token': token  # For testing
            }
        except:
            res_data = {
                'status': False,
                'message': '已使用电话号码，请尝试另一个' if not error_message else ''
            }

        finally:
            return Response(res_data, status=status.HTTP_200_OK)


class DeviceVerificationView(generics.GenericAPIView):
    serializer_class = DeviceSerializer
    authentication_classes = ()

    def post(self, request):
        """
        View for checking sms.
        
        Receive an phone number and sms codes as parameter.

        """
        phone_number = request.data.get('phone_number')
        sms_code = request.data.get('code')

        if not phone_number or not sms_code:
            return Response({
                'status': False,
                'message': '电话号码和代码是必需的',
                'phone_number': phone_number
            }, status=status.HTTP_200_OK)

        device = models.Device.objects.filter(phone_number=phone_number, sms_code=sms_code).first()

        res_data = {
            'status': False,
            'message': '',
            'phone_number': phone_number
        }

        if not device:
            res_data.update({
                'message': '电话号码和短信代码不正确.'
            })
        else:
            if device.sent_at < datetime.now(timezone(settings.TIME_ZONE)) - timedelta(hours=2):
                res_data.update({
                    'message': '电话号码和短信代码不正确.'
                })
            else:
                models.Device.objects.filter(phone_number=phone_number, sms_code=sms_code).update(
                    is_phone_verified=True)
                res_data.update({
                    'message': '手机已成功验证.',
                    'status': True
                })

        return Response(res_data, status=status.HTTP_200_OK)


class ManageUserViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminUser,)
    authentication_classes = (TokenAuthentication,)
    serializer_class = UserManageSerializer
    pagination_class = CustomPageNumberPagination
    filter_backends = (DjangoFilterBackend, SearchFilter,)
    search_fields = ('username', 'name', 'email',)

    def get_queryset(self):
        ordering = self.request.query_params.get('ordering')
        if ordering:
            return User.objects.all().order_by(ordering)
        else:
            return User.objects.all().order_by('date_joined')


class NewUsersStatusView(generics.GenericAPIView):
    permission_classes = (IsAdminUser,)
    authentication_classes = (TokenAuthentication,)

    @staticmethod
    def get(request):
        today = datetime.now(timezone(settings.TIME_ZONE))
        period = request.query_params.get('period', '7')

        period = int(period)
        data = []
        for i in range(period + 1, -1, -1):
            t_date = today - timedelta(days=i)
            count = User.objects.filter(
                date_joined__year=t_date.year, date_joined__month=t_date.month, date_joined__day=t_date.day).count()

            datum = {
                'name': t_date.strftime('%Y-%m-%d'),
                'value': count
            }
            data.append(datum)

        return Response(data, status=status.HTTP_200_OK)


class MembershipViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminUser,)
    authentication_classes = (TokenAuthentication,)
    pagination_class = CustomPageNumberPagination
    serializer_class = MembershipSerializer

    def get_queryset(self):
        ordering = self.request.query_params.get('ordering')
        if ordering:
            return models.MemberShip.objects.all().order_by(ordering)
        else:
            return models.MemberShip.objects.all().order_by('price')


class MembershipList(generics.ListAPIView):
    permission_classes = (IsAdminUser, )
    authentication_classes = (TokenAuthentication, )
    pagination_class = CustomPageNumberPagination
    serializer_class = MembershipSummarySerializer

    def get_queryset(self):
        return models.MemberShip.objects.all().order_by('price')

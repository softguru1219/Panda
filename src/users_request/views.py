from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from .models import SearchProductRequest, AnalysisProductRequest
import datetime
from pytz import timezone
from django.conf import settings
import users_request.serializers as serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from lib.core import CustomPageNumberPagination


class UserStatusSearchView(generics.ListAPIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )
    serializer_class = serializers.SearchProductRequestSerializer
    pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        today = datetime.datetime.now(timezone(settings.TIME_ZONE))
        period = self.request.query_params.get('period', 'month')

        filter_options = {
            'user': self.request.user
        }

        if period in ['month', 'day']:
            filter_options['created_at__year'] = today.year
            filter_options['created_at__month'] = today.month

        if period == 'day':
            filter_options['created_at__day'] = today.day

        return SearchProductRequest.objects.filter(**filter_options).order_by('id')


class UserStatusSummaryView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    @staticmethod
    def get(request):
        month = request.query_params.get('month')
        year = request.query_params.get('year')

        if not year:
            return Response(status=status.HTTP_404_NOT_FOUND, data={'message': 'Year, month fields are required!'})
        year = int(year)
        if month:
            month = int(month)
            use_count = SearchProductRequest.objects.filter(
                user=request.user, created_at__year=int(year), created_at__month=month).count()
            total_count = 100
            data = [
                {
                    'name': '使用数量',
                    'value': use_count
                },
                {
                    'name': '剩余数量',
                    'value': total_count - use_count
                }
            ]

        else:
            data = []

            for i in range(1, 13):
                use_count = SearchProductRequest.objects.filter(
                    user=request.user, created_at__year=int(year), created_at__month=i).count()
                data.append({
                    'name': '{}月'.format(i),
                    'value': use_count
                })
        return Response(data, status=status.HTTP_200_OK)


class UserStatusAnalysisView(generics.ListAPIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )
    pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        return AnalysisProductRequest.objects.filter(user=self.request.user).order_by('id')

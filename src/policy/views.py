from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
import policy.models as models
import policy.serializers as serializers
from rest_framework.permissions import IsAdminUser
from knox.auth import TokenAuthentication


class PolicyView(APIView):
    permission_classes = (IsAdminUser, )
    authentication_classes = (TokenAuthentication, )

    @staticmethod
    def get(request):
        policy = models.Policy.objects.first()
        data = serializers.PolicySerializer(policy).data
        return Response(data, status=status.HTTP_200_OK)

    @staticmethod
    def post(request):
        if models.Policy.objects.count() == 0:
            models.Policy.objects.create(**request.data)
        else:
            models.Policy.objects.all().update(**request.data)

        return Response(data={'status': True}, status=status.HTTP_200_OK)

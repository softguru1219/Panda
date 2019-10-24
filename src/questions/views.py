from django.shortcuts import render
from rest_framework import generics, status, viewsets
from rest_framework.filters import SearchFilter
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
import questions.models as models
import questions.serializers as serializers
from lib.core import CustomPageNumberPagination


class CreateQuestionView(generics.CreateAPIView):
    serializer_class = serializers.QuestionSerializer
    authentication_classes = ()
    permission_classes = ()
    queryset = models.Question.objects.all()


class QuestionListView(generics.ListAPIView):
    queryset = models.Question.objects.all()
    serializer_class = serializers.QuestionSerializer
    permission_classes = (IsAdminUser,)
    pagination_class = CustomPageNumberPagination
    authentication_classes = (TokenAuthentication,)


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = models.Answer.objects.all()
    serializer_class = serializers.AnswerSerializer
    permission_classes = (IsAdminUser, )
    pagination_class = CustomPageNumberPagination
    authentication_classes = (TokenAuthentication, )

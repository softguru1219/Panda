from rest_framework import serializers
import questions.models as models
from django.conf import settings
from pytz import timezone


class AnswerSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()

    class Meta:
        model = models.Answer
        fields = '__all__'

    @staticmethod
    def get_created_at(obj):
        return obj.created_at.astimezone(timezone(settings.TIME_ZONE)).strftime("%Y, %b %d  %H:%M:%S") \
            if obj.created_at else None


class QuestionSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()
    answer = AnswerSerializer(read_only=True)

    class Meta:
        model = models.Question
        fields = '__all__'

    @staticmethod
    def get_created_at(obj):
        return obj.created_at.astimezone(timezone(settings.TIME_ZONE)).strftime("%Y, %b %d  %H:%M:%S") \
            if obj.created_at else None


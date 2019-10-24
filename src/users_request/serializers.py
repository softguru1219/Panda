from rest_framework import serializers
from .models import SearchProductRequest, AnalysisProductRequest
from category.models import FirstCategory, SecondCategory, ThirdCategory
from pytz import timezone
from django.conf import settings
import locale
locale.setlocale(locale.LC_ALL, 'zh_CN.UTF-8')


class SearchProductRequestSerializer(serializers.ModelSerializer):
    cat1 = serializers.SerializerMethodField()
    cat2 = serializers.SerializerMethodField()
    cat3 = serializers.SerializerMethodField()
    created_at = serializers.SerializerMethodField()

    class Meta:
        model = SearchProductRequest
        fields = '__all__'

    @staticmethod
    def get_cat1(obj):
        return obj.cat1.title if obj.cat1 else None

    @staticmethod
    def get_cat2(obj):
        return obj.cat2.title if obj.cat2 else None

    @staticmethod
    def get_cat3(obj):
        return obj.cat3.title if obj.cat3 else None

    @staticmethod
    def get_created_at(obj):
        return obj.created_at.astimezone(timezone(settings.TIME_ZONE)).strftime("%Y, %b %d  %H:%M:%S") \
            if obj.created_at else None

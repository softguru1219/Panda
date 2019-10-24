from rest_framework import serializers
import category.models as models


class ThirdCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ThirdCategory
        fields = '__all__'


class SecondCategorySerializer(serializers.ModelSerializer):
    submenu = ThirdCategorySerializer(many=True, source='child')

    class Meta:
        model = models.SecondCategory
        fields = '__all__'


class FirstCategorySerializer(serializers.ModelSerializer):
    submenu = SecondCategorySerializer(many=True, source='child')

    class Meta:
        model = models.FirstCategory
        fields = '__all__'

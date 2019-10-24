from rest_framework import serializers
import product.models as models
from accounts.serializers import UserCommentSerializer
from pytz import timezone
from django.conf import settings
import locale
locale.setlocale(locale.LC_ALL, 'zh_CN.UTF-8')


class ProductSerializer(serializers.ModelSerializer):
    img = serializers.SerializerMethodField()
    like = serializers.SerializerMethodField()
    unlike = serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()
    available_analysis = serializers.SerializerMethodField()

    class Meta:
        model = models.Product
        fields = (
            'id',
            'title',
            'seller_ch',
            'img',
            'original_price',
            'sailing_price',
            'brand',
            'like',
            'unlike',
            'comment_count',
            'available_analysis'
        )

    @staticmethod
    def get_img(obj):
        return obj.image_links[0] if obj.image_links else None

    @staticmethod
    def get_like(obj):
        return models.LikeProduct.objects.filter(product=obj).count()

    @staticmethod
    def get_unlike(obj):
        return models.UnLikeProduct.objects.filter(product=obj).count()

    @staticmethod
    def get_comment_count(obj):
        return models.ProductComment.objects.filter(product=obj).count()

    def get_available_analysis(self, obj):
        user = self.context['request'].user if self.context.get('request') else None
        if user and user.is_authenticated():
            return models.AnalyticProduct.objects.filter(user=self.context['request'].user, product=obj).count() == 0
        else:
            return True


class ProductFilterSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Product
        fields = ('color_and_sizes', 'item_properties', 'brand', )


class ProductCommentSerializer(serializers.ModelSerializer):
    like = serializers.SerializerMethodField()
    unlike = serializers.SerializerMethodField()
    user_info = UserCommentSerializer(read_only=True, source='user')
    created_at = serializers.SerializerMethodField()

    class Meta:
        model = models.ProductComment
        fields = (
            'id',
            'like',
            'unlike',
            'content',
            'user',
            'user_info',
            'product',
            'created_at',
            'is_edited',
        )

    @staticmethod
    def get_like(obj):
        return models.LikeProductComment.objects.filter(comment=obj).count()

    @staticmethod
    def get_unlike(obj):
        return models.UnLikeProductComment.objects.filter(comment=obj).count()

    @staticmethod
    def get_created_at(obj):
        return obj.created_at.astimezone(timezone(settings.TIME_ZONE)).strftime("%Y, %b %d  %H:%M:%S") \
            if obj.created_at else None


class LikeProductCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.LikeProductComment
        fields = '__all__'


class UnLikeProductCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UnLikeProductComment
        fields = '__all__'


class ProductDetailSerializer(serializers.ModelSerializer):
    product_comments = ProductCommentSerializer(read_only=True, many=True)
    like = serializers.SerializerMethodField()
    unlike = serializers.SerializerMethodField()
    discount_until = serializers.SerializerMethodField(read_only=True)
    available_analysis = serializers.SerializerMethodField()

    class Meta:
        model = models.Product
        fields = '__all__'

    @staticmethod
    def get_like(obj):
        return models.LikeProduct.objects.filter(product=obj).count()

    @staticmethod
    def get_unlike(obj):
        return models.UnLikeProduct.objects.filter(product=obj).count()

    @staticmethod
    def get_discount_until(obj):
        return obj.discount_until.astimezone(timezone(settings.TIME_ZONE)).strftime("%Y-%m-%d") \
            if obj.discount_until else None

    def get_available_analysis(self, obj):
        user = self.context['request'].user if self.context.get('request') else None
        if user and user.is_authenticated():
            return models.AnalyticProduct.objects.filter(user=self.context['request'].user, product=obj).count() == 0
        else:
            return True


class LikeProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.LikeProduct
        fields = '__all__'


class UnLikeProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.UnLikeProduct
        fields = '__all__'


class AnalyticProductSerializer(serializers.ModelSerializer):
    img = serializers.SerializerMethodField()
    like = serializers.SerializerMethodField()
    unlike = serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()

    class Meta:
        model = models.Product
        fields = (
            'id',
            'title',
            'seller_ch',
            'img',
            'sailing_price',
            'original_price',
            'brand',
            'like',
            'unlike',
            'comment_count',
            'analysis',
        )

    @staticmethod
    def get_img(obj):
        return obj.image_links[0] if obj.image_links else None

    @staticmethod
    def get_like(obj):
        return models.LikeProduct.objects.filter(product=obj).count()

    @staticmethod
    def get_unlike(obj):
        return models.UnLikeProduct.objects.filter(product=obj).count()

    @staticmethod
    def get_comment_count(obj):
        return models.ProductComment.objects.filter(product=obj).count()

    def update(self, instance, validated_data):
        models.AnalyticProduct.objects.create(user=self.context.get('request').user, product=instance)
        return instance

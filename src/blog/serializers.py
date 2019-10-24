from rest_framework import serializers
import blog.models as models
from accounts.serializers import UserCommentSerializer
from django.conf import settings
from pytz import timezone

import locale
locale.setlocale(locale.LC_TIME, 'zh_CN.UTF-8')


class BlogSerializer(serializers.ModelSerializer):
    like = serializers.SerializerMethodField()
    unlike = serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()
    img_url = serializers.SerializerMethodField()
    created_at = serializers.SerializerMethodField()
    user_name = serializers.CharField(source='user.name')

    class Meta:
        model = models.Blog
        fields = (
            'id',
            'title',
            'content',
            'img_url',
            'img',
            'like',
            'unlike',
            'user',
            'comment_count',
            'created_at',
            'updated_at',
            'user_name'
        )

    @staticmethod
    def get_like(obj):
        return models.LikeBlog.objects.filter(blog=obj).count()

    @staticmethod
    def get_unlike(obj):
        return models.UnLikeBlog.objects.filter(blog=obj).count()

    @staticmethod
    def get_comment_count(obj):
        return models.BlogComment.objects.filter(blog=obj).count()

    @staticmethod
    def get_img_url(obj):
        return obj.img.url.split('/')[-1] if obj.img else None

    @staticmethod
    def get_created_at(obj):
        return obj.created_at.astimezone(timezone(settings.TIME_ZONE)).strftime("%Y, %b %d  %H:%M:%S") \
            if obj.created_at else None


class BlogCommentSerializer(serializers.ModelSerializer):
    like = serializers.SerializerMethodField()
    unlike = serializers.SerializerMethodField()
    user_info = UserCommentSerializer(read_only=True, source='user')
    created_at = serializers.SerializerMethodField()

    class Meta:
        model = models.BlogComment
        fields = (
            'id',
            'like',
            'unlike',
            'content',
            'user',
            'user_info',
            'blog',
            'created_at',
            'is_edited',
        )

    @staticmethod
    def get_like(obj):
        return models.LikeBlogComment.objects.filter(comment=obj).count()

    @staticmethod
    def get_unlike(obj):
        return models.UnLikeBlogComment.objects.filter(comment=obj).count()

    @staticmethod
    def get_created_at(obj):
        return obj.created_at.astimezone(timezone(settings.TIME_ZONE)).strftime("%Y, %b %d  %H:%M:%S") \
            if obj.created_at else None

    def create(self, validated_data):
        comment = models.BlogComment.objects.create(**validated_data)
        return comment


class BlogDetailSerializer(serializers.ModelSerializer):
    blog_comments = BlogCommentSerializer(read_only=True, many=True)
    like = serializers.SerializerMethodField()
    unlike = serializers.SerializerMethodField()
    img_url = serializers.SerializerMethodField()
    created_at = serializers.SerializerMethodField()
    user_name = serializers.CharField(source='user.name')

    class Meta:
        model = models.Blog
        fields = '__all__'

    @staticmethod
    def get_like(obj):
        return models.LikeBlog.objects.filter(blog=obj).count()

    @staticmethod
    def get_unlike(obj):
        return models.UnLikeBlog.objects.filter(blog=obj).count()

    @staticmethod
    def get_img_url(obj):
        return obj.img.url.split('/')[-1] if obj.img else None

    @staticmethod
    def get_created_at(obj):
        return obj.created_at.astimezone(timezone(settings.TIME_ZONE)).strftime("%Y, %b %d  %H:%M:%S") \
            if obj.created_at else None


class LikeBlogCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.LikeBlogComment
        fields = '__all__'


class UnLikeBlogCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UnLikeBlogComment
        fields = '__all__'


class LikeBlogSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.LikeBlog
        fields = '__all__'


class UnLikeBlogSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.UnLikeBlog
        fields = '__all__'

import uuid
from rest_framework import serializers

from accounts.models import User, Device, MemberShip
from django.contrib.auth import authenticate
from django.db.models import Q
from django.core.mail import EmailMessage
from django.template.loader import get_template


class DeviceSerializer(serializers.ModelSerializer):
    phone_number = serializers.RegexField(r'^\+?1?\d{9,15}$', required=True)

    class Meta:
        model = Device
        fields = ('phone_number', )


class UserLoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField()

    class Meta:
        model = User
        fields = ('username', 'password',)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('无法使用提供的凭据登录')


class UserSerializer(serializers.ModelSerializer):
    phone_number = serializers.SerializerMethodField()
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'name',
            'password',
            'phone_number',
            'avatar',
            'avatar_url',
            'confirmed_email',
            'member',
            'is_superuser'
        )

        extra_kwargs = {
            'password': {'write_only': True},
        }

    @staticmethod
    def get_avatar_url(obj):
        return obj.avatar.url.split('/')[-1] if obj.avatar else None

    def create(self, validated_data):
        """
        Create the object.

        :param validated_data: string
        """

        request = self.context.get('request', {})
        phone_number = request.data.get('phone_number')
        device = Device.objects.filter(phone_number=phone_number, is_phone_verified=True).first()
        
        if not device:
            raise Exception('Please try phone verification again.')

        user = User.objects.create(**validated_data)

        Device.objects.filter(phone_number=phone_number, is_phone_verified=True).update(user=user)

        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        '''
            Overided for Checking if the phone_number is changed.
            if phone_number is changed and sms is verified, delete it and assign new phone_number to user.
        '''
        phone_number = validated_data.get('phone_number')
        device = Device.objects.filter(phone_number=phone_number, is_phone_verified=True, user=None)
        if device and phone_number:
            Device.objects.filter(
                Q(user=instance),
                ~Q(phone_number=phone_number)
            ).delete()
            Device.objects.filter(
                Q(phone_number=phone_number),
                Q(is_phone_verified=True),
                ~Q(user=instance)
            ).update(user=instance)
        password = validated_data.get('password')
        if password:
            instance.set_password(password)
        email = validated_data.get('email')
        if email:
            if email == 'panda109_{}'.format(instance.email):
                email = instance.email
                validated_data.pop('email')
            validated_data['activation_key'] = uuid.uuid4()
            msg = EmailMessage(
                '验证',
                get_template('email_confirmation.html').render({
                    'activation_key': str(validated_data['activation_key']),
                    'domain': 'http://localhost:8000',
                    'username': instance.name
                }),
                to=[email]
            )
            msg.content_subtype = 'html'
            msg.send()
        instance = super(UserSerializer, self).update(instance, validated_data)
        instance.save()
        return instance

    @staticmethod
    def get_phone_number(obj):
        try:
            return obj.device.phone_number
        except Exception as e:
            if obj.is_superuser:
                return None
            else:
                raise e


class UserCommentSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'avatar', 'name', )

    @staticmethod
    def get_avatar(obj):
        return obj.avatar.url.split('/')[-1] if obj.avatar else None


class UserManageSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()
    phone_number = serializers.SerializerMethodField()
    membership = serializers.SerializerMethodField()

    class Meta:
        model = User
        exclude = ('password', )

    @staticmethod
    def get_avatar_url(obj):
        return obj.avatar.url.split('/')[-1] if obj.avatar else None

    @staticmethod
    def get_phone_number(obj):
        try:
            return obj.device.phone_number
        except Exception as e:
            if obj.is_superuser:
                return None
            else:
                raise e

    @staticmethod
    def get_membership(obj):
        return obj.member.name_en if obj.member else None

    def update(self, instance, validated_data):
        '''
            Overided for Checking if the phone_number is changed.
            if phone_number is changed and sms is verified, delete it and assign new phone_number to user.
        '''
        phone_number = validated_data.get('phone_number')
        device = Device.objects.filter(phone_number=phone_number, is_phone_verified=True, user=None)
        if device and phone_number:
            Device.objects.filter(
                Q(user=instance),
                ~Q(phone_number=phone_number)
            ).delete()
            Device.objects.filter(
                Q(phone_number=phone_number),
                Q(is_phone_verified=True),
                ~Q(user=instance)
            ).update(user=instance)
        password = validated_data.get('password')
        if password:
            instance.set_password(password)
        instance = super(UserManageSerializer, self).update(instance, validated_data)
        instance.save()
        return instance

    def create(self, validated_data):
        """
        Create the object.

        :param validated_data: string
        """

        request = self.context.get('request', {})

        user = User.objects.create(**validated_data)

        phone_number = request.data.get('phone_number')
        device = Device.objects.filter(phone_number=phone_number, is_phone_verified=True).first()

        if not device:
            Device.objects.create(phone_number=phone_number, user=user)

        password = request.data.get('password')
        user.set_password(password)
        user.save()
        return user


class MembershipSerializer(serializers.ModelSerializer):

    class Meta:
        model = MemberShip
        fields = '__all__'


class MembershipSummarySerializer(serializers.ModelSerializer):

    class Meta:
        model = MemberShip
        fields = ('id', 'name_en', )

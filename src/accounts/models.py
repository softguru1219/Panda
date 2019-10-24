import uuid
from datetime import timedelta

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.contrib.postgres.fields import JSONField


class MyUserManager(BaseUserManager):
    def _create_user(self, username, email, password, is_staff, is_superuser, **extra_fields):
        """
        Create and save an User with the given email, password, name and phone number.

        :param email: string
        :param password: string
        :param name: string
        :param is_staff: boolean
        :param is_superuser: boolean
        :param extra_fields:
        :return: User
        """
        now = timezone.now()
        email = self.normalize_email(email)
        user = self.model(
            username=username,
            email=email,
            is_staff=is_staff,
            is_active=True,
            is_superuser=is_superuser,
            last_login=now,
            date_joined=now, 
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email, name, password, **extra_fields):
        """
        Create and save an User with the given email, password and name.

        :param email: string
        :param name: string
        :param password: string
        :param extra_fields:
        :return: User
        """

        return self._create_user(email, password, name, is_staff=False, is_superuser=False,
                                 **extra_fields)

    def create_superuser(self, email, username='', password=None, **extra_fields):
        """
        Create a super user.

        :param email: string
        :param name: string
        :param password: string
        :param extra_fields:
        :return: User
        """
        return self._create_user(email=email, password=password, username=username, is_staff=True, is_superuser=True,
                                 **extra_fields)


class MemberShip(models.Model):
    name = models.CharField(max_length=50)
    name_en = models.CharField(max_length=50, null=True, blank=True)
    anonymous_request = models.IntegerField()
    search_request = models.IntegerField()
    analysis_request = models.IntegerField()
    features = JSONField(null=True, blank=True)
    price = models.DecimalField(blank=True, null=True, max_digits=15, decimal_places=2)
    color = models.CharField(max_length=8, blank=True, null=True, default="#ffffff")


class User(AbstractBaseUser):
    """
    Model that represents an user.

    To be active, the user must register and confirm his email.
    """

    GENDER_MALE = 'M'
    GENDER_FEMALE = 'F'
    GENDER_CHOICES = (
        (GENDER_MALE, 'Male'),
        (GENDER_FEMALE, 'Female')
    )

    # we want primary key to be called id so need to ignore pytlint
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  # pylint: disable=invalid-name

    email = models.EmailField(_('Email address'), unique=True, default='')

    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default=GENDER_MALE)

    member = models.ForeignKey(MemberShip, null=True, default=None, on_delete=models.CASCADE)

    confirmed_email = models.BooleanField(default=False)

    is_staff = models.BooleanField(_('staff status'), default=False)
    is_superuser = models.BooleanField(_('superuser status'), default=False)
    is_active = models.BooleanField(_('active'), default=True)

    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    date_updated = models.DateTimeField(_('date updated'), auto_now=True)

    username = models.CharField(unique=True, max_length=25, default='')
    avatar = models.ImageField(blank=True, null=True, default=None, upload_to='src/static/images/users/')

    name = models.CharField(_('Name'), max_length=100, blank=True, null=True)

    activation_key = models.UUIDField(unique=True, default=uuid.uuid4)  # email

    USERNAME_FIELD = 'username'

    objects = MyUserManager()

    REQUIRED_FIELDS = ['email']

    def __str__(self):
        """
        Unicode representation for an user model.

        :return: string
        """
        return self.username

    def activation_expired(self):
        """
        Check if user's activation has expired.

        :return: boolean
        """
        return self.date_joined + timedelta(days=settings.ACCOUNT_ACTIVATION_DAYS) < timezone.now()

    def confirm_email(self):
        """
        Confirm email.

        :return: boolean
        """
        if not self.activation_expired() and not self.confirmed_email:
            self.confirmed_email = True
            self.save()
            return True
        return False


class Device(models.Model):
    phone_number = models.CharField(unique=True, max_length=17, null=True, blank=True)
    sms_code = models.CharField(max_length=6, null=True, blank=True)
    is_phone_verified = models.BooleanField(default=False)
    sent_at = models.DateTimeField(auto_now_add=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)


class Settings(models.Model):
    email_notification = models.BooleanField(default=False)
    notification_discount_product = models.BooleanField(default=False)
    notification_time = models.TimeField(
        blank=True,
        default=timezone.now().replace(hour=8, minute=0, second=0).time()
    )
    before_day = models.IntegerField(default=0)
    before_minutes = models.IntegerField(default=0)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='settings')


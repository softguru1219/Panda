# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2019-05-14 08:02
from __future__ import unicode_literals

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('email', models.EmailField(default='', max_length=254, unique=True, verbose_name='Email address')),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], default='M', max_length=1)),
                ('confirmed_email', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False, verbose_name='staff status')),
                ('is_superuser', models.BooleanField(default=False, verbose_name='superuser status')),
                ('is_active', models.BooleanField(default=True, verbose_name='active')),
                ('date_joined', models.DateTimeField(auto_now_add=True, verbose_name='date joined')),
                ('date_updated', models.DateTimeField(auto_now=True, verbose_name='date updated')),
                ('username', models.CharField(default='', max_length=25, unique=True)),
                ('avatar', models.ImageField(blank=True, default=None, null=True, upload_to='src/static/images/users/')),
                ('name', models.CharField(blank=True, max_length=100, null=True, verbose_name='Name')),
                ('activation_key', models.UUIDField(default=uuid.uuid4, unique=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Device',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone_number', models.CharField(blank=True, max_length=17, null=True, unique=True)),
                ('sms_code', models.CharField(blank=True, max_length=6, null=True)),
                ('is_phone_verified', models.BooleanField(default=False)),
                ('sent_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MemberShip',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('name_en', models.CharField(blank=True, max_length=50, null=True)),
                ('anonymous_request', models.IntegerField()),
                ('search_request', models.IntegerField()),
                ('analysis_request', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Settings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email_notification', models.BooleanField(default=False)),
                ('notification_discount_product', models.BooleanField(default=False)),
                ('notification_time', models.TimeField(blank=True, default=datetime.time(8, 0, 0, 121180))),
                ('before_day', models.IntegerField(default=0)),
                ('before_minutes', models.IntegerField(default=0)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='settings', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='member',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='accounts.MemberShip'),
        ),
    ]

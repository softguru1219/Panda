# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2019-05-14 08:42
from __future__ import unicode_literals

import datetime
import django.contrib.postgres.fields.jsonb
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='membership',
            name='features',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='settings',
            name='notification_time',
            field=models.TimeField(blank=True, default=datetime.time(8, 0, 0, 468310)),
        ),
    ]

# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2019-05-17 00:19
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_auto_20190515_1213'),
    ]

    operations = [
        migrations.AlterField(
            model_name='settings',
            name='notification_time',
            field=models.TimeField(blank=True, default=datetime.time(8, 0, 0, 718442)),
        ),
    ]

# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2019-05-15 19:13
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0002_auto_20190515_0758'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='answer',
            options={'ordering': ('-created_at',)},
        ),
    ]

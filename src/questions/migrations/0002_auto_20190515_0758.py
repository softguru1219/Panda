# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2019-05-15 14:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='answer',
            options={'ordering': ('created_at',)},
        ),
        migrations.AlterModelOptions(
            name='question',
            options={'ordering': ('created_at',)},
        ),
        migrations.RemoveField(
            model_name='answer',
            name='text',
        ),
        migrations.RemoveField(
            model_name='question',
            name='text',
        ),
        migrations.AddField(
            model_name='answer',
            name='description',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='question',
            name='description',
            field=models.TextField(default=''),
        ),
    ]

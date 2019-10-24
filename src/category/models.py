from django.db import models


class FirstCategory(models.Model):
    title = models.CharField(max_length=20)
    origin_id = models.IntegerField(null=True, blank=True)


class SecondCategory(models.Model):
    title = models.CharField(max_length=20)
    parent = models.ForeignKey(FirstCategory, on_delete=models.CASCADE, related_name='child')
    origin_id = models.IntegerField(null=True, blank=True)


class ThirdCategory(models.Model):
    title = models.CharField(max_length=255)
    parent = models.ForeignKey(SecondCategory, on_delete=models.CASCADE, related_name='child')
    origin_id = models.IntegerField(null=True, blank=True)


class OriginCategory(models.Model):
    url = models.URLField()
    seller = models.CharField(max_length=10)
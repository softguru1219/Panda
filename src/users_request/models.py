from django.db import models

import category.models as cat_models
from accounts.models import User
from product.models import Product
from django.contrib.postgres.fields import JSONField


class AnonymousRequest(models.Model):
    """
    Model that represents an Search request for Anonymous User.
    It's used for limit anonymous user search action.
    """
    user_ip = models.GenericIPAddressField()
    user_agent = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)


class SearchProductRequest(models.Model):
    """
    Model that represents an search request for Registered User.
    It's used for limit registered user's actions such as Search, Analysis
    """

    search_key = models.CharField(max_length=255, null=False, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    cat1 = models.ForeignKey(cat_models.FirstCategory, on_delete=models.CASCADE, null=True, blank=True)
    cat2 = models.ForeignKey(cat_models.SecondCategory, on_delete=models.CASCADE, null=True, blank=True)
    cat3 = models.ForeignKey(cat_models.ThirdCategory, on_delete=models.CASCADE, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    color_and_sizes = JSONField(null=True, blank=True)
    item_properties = JSONField(null=True, blank=True)


class AnalysisProductRequest(models.Model):
    """
    Model that represents an analysis request for Registered User.
    It's used for limit registered user's Analysis action.
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

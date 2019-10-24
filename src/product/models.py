from django.db import models
from django.contrib.postgres.fields import JSONField
from accounts.models import User
from category.models import FirstCategory, SecondCategory, ThirdCategory


class Product(models.Model):
    title = models.CharField(max_length=255, null=True, blank=True)
    product_description = models.TextField(null=True, blank=True)
    sku_id = models.CharField(max_length=50, null=True, blank=True)
    url = models.URLField(null=True, blank=True)
    image_links = JSONField(null=True, blank=True)  # JsonField
    video_links = JSONField(null=True, blank=True)  # JsonField
    color_and_sizes = JSONField(null=True, blank=True)
    sailing_price = models.DecimalField(blank=True, null=True, max_digits=15, decimal_places=2)
    price_history = JSONField(null=True, blank=True)
    original_price = models.DecimalField(blank=True, null=True, max_digits=15, decimal_places=2)
    quantity = models.IntegerField(null=True, blank=True)
    discount_until = models.DateTimeField(null=True, blank=True)
    discount_promotion = JSONField(null=True, blank=True)
    gifts = JSONField(null=True, blank=True)
    review_count = models.IntegerField(null=True, blank=True)
    review_score = models.DecimalField(blank=True, null=True, max_digits=3, decimal_places=2)
    item_properties = JSONField(null=True, blank=True)
    stock_status = models.NullBooleanField(null=True, blank=True)
    seller_en = models.CharField(max_length=20, null=True, blank=True)
    seller_ch = models.CharField(max_length=20, null=True, blank=True)
    keywords = models.CharField(max_length=255, null=True, blank=True)
    brand = models.CharField(max_length=255, null=True, blank=True)  #

    category = JSONField(null=True, blank=True)

    cat1 = models.ForeignKey(FirstCategory, on_delete=models.CASCADE, null=True, blank=True)
    cat2 = models.ForeignKey(SecondCategory, on_delete=models.CASCADE, null=True, blank=True)
    cat3 = models.ForeignKey(ThirdCategory, on_delete=models.CASCADE, null=True, blank=True)

    likes = models.ManyToManyField(User, through='LikeProduct', related_name='like_products')
    unlikes = models.ManyToManyField(User, through='UnLikeProduct', related_name='unlike_products')
    analysis = models.ManyToManyField(User, through='AnalyticProduct', related_name='analysis_products')

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    updated_idx = models.IntegerField(null=True, blank=True, default=0)


class LikeProduct(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'product', )


class UnLikeProduct(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'product', )


class ProductComment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_comments')
    content = models.TextField(default='')
    is_edited = models.NullBooleanField(default=False)
    likes = models.ManyToManyField(User, through='LikeProductComment', related_name='pc_likes')
    unlikes = models.ManyToManyField(User, through='UnLikeProductComment', related_name='pc_unlikes')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('created_at', )


class LikeProductComment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(ProductComment, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'comment')


class UnLikeProductComment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(ProductComment, on_delete=models.CASCADE)


class AnalyticProduct(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    class Meta:
        ordering = ('created_at', )
        unique_together = ('user', 'product', )

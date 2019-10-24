from django.db import models
from accounts.models import User


class Blog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, default='')
    img = models.ImageField(upload_to='src/static/images/blogs/', blank=True, null=True, default=None)
    content = models.TextField(default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(User, through='LikeBlog', related_name='like_blogs')
    unlikes = models.ManyToManyField(User, through='UnLikeBlog', related_name='unlike_blogs')

    class Meta:
        ordering = ('created_at', )


class LikeBlog(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class UnLikeBlog(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class BlogComment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='blog_comments')
    content = models.TextField(default='')
    is_edited = models.NullBooleanField(default=False)
    likes = models.ManyToManyField(User, through='LikeBlogComment', related_name='like_bcs')
    unlikes = models.ManyToManyField(User, through='UnLikeBlogComment', related_name='unlike_bcs')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class LikeBlogComment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(BlogComment, on_delete=models.CASCADE)


class UnLikeBlogComment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(BlogComment, on_delete=models.CASCADE)

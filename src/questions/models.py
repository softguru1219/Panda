from django.db import models


class Question(models.Model):
    email = models.EmailField()
    title = models.CharField(max_length=255)
    description = models.TextField(default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('created_at', )


class Answer(models.Model):
    question = models.OneToOneField(Question, on_delete=models.CASCADE)
    description = models.TextField(default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at', )

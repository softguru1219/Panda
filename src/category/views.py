from category.serializers import FirstCategorySerializer
from category.models import FirstCategory
from rest_framework import generics


class CategoryView(generics.ListAPIView):
    pagination_class = None
    serializer_class = FirstCategorySerializer
    queryset = FirstCategory.objects.all()


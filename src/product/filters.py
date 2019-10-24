import product.models as models
from django_filters import rest_framework as filters
from django_filters import NumberFilter, CharFilter
import json


class ProductFilter(filters.FilterSet):
    review_score_min = NumberFilter(field_name='review_score', lookup_expr='gte')
    review_score_max = NumberFilter(field_name='review_score', lookup_expr='lte')

    sailing_price_min = NumberFilter(field_name='sailing_price', lookup_expr='gte')
    sailing_price_max = NumberFilter(field_name='sailing_price', lookup_expr='lte')

    item_properties = CharFilter(field_name='item_properties', method='filter_item_properties')
    color_and_sizes = CharFilter(field_name='color_and_sizes', method='filter_color_and_sizes')

    brand = CharFilter(field_name='brand')

    cat1 = NumberFilter(field_name='cat1', method='filter_category1')
    cat2 = NumberFilter(field_name='cat2', method='filter_category2')
    cat3 = NumberFilter(field_name='cat3', method='filter_category3')

    @staticmethod
    def filter_item_properties(queryset, name, value):
        if value:
            json_value = json.loads(value)
            if json_value:
                return queryset.filter(item_properties__contains=json_value)
        return queryset

    @staticmethod
    def filter_color_and_sizes(queryset, name, value):
        if value:
            json_value = json.loads(value)
            if json_value:
                return queryset.filter(color_and_sizes__contains=json.loads(value))
        return queryset

    @staticmethod
    def filter_category3(queryset, name, value):
        return queryset.filter(cat3=value)

    @staticmethod
    def filter_category2(queryset, name, value):
        return queryset.filter(cat2=value)

    @staticmethod
    def filter_category1(queryset, name, value):
        return queryset.filter(cat1=value)

    class Meta:
        model = models.Product
        fields = ['review_score', 'sailing_price', 'brand',]

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status, viewsets
from django.db.models import Q

import product.models as models
import product.serializers as serializers
from rest_framework.filters import SearchFilter
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from lib.core import OnlyActivatedUser
from lib.core import CustomPageNumberPagination
import datetime
from pytz import timezone
from django.conf import settings
from math import ceil


class ProductListView(generics.ListAPIView):
    serializer_class = serializers.ProductSerializer
    authentication_classes = (TokenAuthentication,)
    pagination_class = None
    # permission_classes = (AnonymousUserPermission, FreeMemberSearchPermission, )
    permission_classes = ()

    default_filters = [
        'sailing_price is not Null'
    ]

    def get_queryset(self):
        ordering = self.request.query_params.get('ordering')
        search = self.request.query_params.get('search')
        page_size = int(self.request.query_params.get('page_size', 60))
        offset = int(self.request.query_params.get('page', 1))

        if not ordering:
            ordering = 'id'

        direction = 'ASC'
        if ordering.startswith('-'):
            direction = 'DESC'
            ordering = ordering.replace('-', '')

        queryset = models.Product.objects.raw('''
            SELECT * FROM product_product 
              WHERE
                {}
                And (
                    position(%s in title) > 0
                    OR position(%s in product_description) > 0
                    OR position(%s in brand) > 0
                )
              ORDER BY {} {}
              LIMIT %s
              OFFSET %s
          '''.format(' AND '.join(self.default_filters), ordering, direction),
                                              (search, search, search, page_size, (offset - 1) * page_size))

        return queryset

    def get_count(self):
        search = self.request.query_params.get('search')

        queryset = models.Product.objects.raw('''
            SELECT 
                *, 
                (
                    SELECT count(id) FROM product_product 
                    WHERE
                        {}
                        And (
                            position(%s in title) > 0
                            OR position(%s in product_description) > 0
                            OR position(%s in brand) > 0
                        )
                ) as product_count 
            FROM product_product 
            WHERE
                sailing_price is not Null 
                And (
                    position(%s in title) > 0
                    OR position(%s in product_description) > 0
                    OR position(%s in brand) > 0
                )
            LIMIT 1
            '''.format(' AND '.join(self.default_filters)), (search, search, search, search, search, search))

        return queryset[0].product_count

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        count = self.get_count()
        total_pages = ceil(count / 60)
        data = self.get_serializer(queryset, many=True).data

        return Response({
            'count': count,
            'totalPages': total_pages,
            'page': int(request.query_params.get('page', 1)),
            'results': data,
            'filters': {
                'color_and_sizes': {},
                'item_properties': {},
                'brand': {
                }
            }
        })

    def get_filters(self, queryset):
        # data = serializers.ProductFilterSerializer(queryset, many=True).data

        # filters_fields = ['color_and_sizes', 'item_properties', ]

        filters = {
            'color_and_sizes': {},
            'item_properties': {},
            'brand': {
                # 'options': list(set([datum.get('brand') for datum in data if datum.get('brand')])),
                # 'value': self.request.query_params.get('brand', '')
            }
        }
        # for datum in data:
        #     for f in filters_fields:
        #         if not datum.get(f):
        #             continue
        #         query_value = json.loads(self.request.query_params.get(f, '{}'))
        #
        #         for k, v in datum[f].items():
        #             val = query_value.get(k, '')
        #             if k not in filters[f]:
        #                 filters[f][k] = {
        #                     'options': [v],
        #                     'title': k,
        #                     'value': ''
        #                 }
        #             else:
        #                 if v not in filters[f][k]['options']:
        #                     filters[f][k]['options'].append(v)
        #
        #             if val:
        #                 filters[f][k]['value'] = val
        return filters


class AnalyticProductListView(generics.ListAPIView, generics.DestroyAPIView, generics.UpdateAPIView):
    authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticatedOrReadOnly, OnlyActivatedUser, BasicAnalyticPermission, )
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.AnalyticProductSerializer
    filter_backends = (SearchFilter,)
    search_fields = ('title', 'product_description', 'brand',)
    lookup_field = 'id'
    pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        if self.request.method == 'PUT':
            return models.Product.objects.all().order_by('created_at')
        else:
            return models.Product.objects.filter(analysis=self.request.user).order_by('created_at')

    def perform_destroy(self, instance):
        models.AnalyticProduct.objects.filter(product=instance, user=self.request.user).delete()


class AnalyticProductDeleteView(APIView):
    authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated, OnlyActivatedUser, )
    permission_classes = (IsAuthenticated,)

    @staticmethod
    def post(request):
        models.AnalyticProduct.objects.filter(user=request.user, product_id__in=request.data.get('products')).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DiscountProductListView(ProductListView):
    default_filters = [
        'sailing_price is not Null'
    ]


class DiscountGeneralProductListView(ProductListView):
    default_filters = [
        'sailing_price is not Null',
        'discount_until is NULL'
    ]


class DiscountTimeProductListView(ProductListView):
    default_filters = [
        'sailing_price is not Null',
        'discount_until is not NULL'
    ]


class DiscountTodayProductListView(ProductListView):
    default_filters = [
        'sailing_price is not Null',
        'discount_until >= \'{}\''.format(
            datetime.datetime.now(timezone(settings.TIME_ZONE)).strftime('%Y-%m-%d %H:%M:%S'))
    ]


class CompareProductView(APIView):
    def post(self, request, *args, **kwargs):
        ids = request.data.get('product_ids')
        data = serializers.ProductDetailSerializer(models.Product.objects.filter(id__in=ids), many=True).data
        start_date = datetime.datetime.now(timezone(settings.TIME_ZONE))
        end_date = datetime.datetime.now(timezone(settings.TIME_ZONE))
        price_history = []
        start_prices = {}
        for datum in data:
            if datum.get('price_history'):
                ph = datum.get('price_history')
                created_at = datetime.datetime.strptime(ph[0].get('created_at'), '%Y-%m-%d').replace(
                    tzinfo=timezone(settings.TIME_ZONE))
                if start_date > created_at:
                    start_date = created_at
                start_prices['prod{}'.format(datum.get('id'))] = ph[0].get('sailing_price')

        while start_date < end_date:
            str_start_date = start_date.strftime('%Y-%m-%d')
            t = {'created_at': str_start_date}
            for datum in data:
                key = 'prod{}'.format(datum.get('id'))
                is_price_formatted = False
                if datum.get('price_history'):
                    ph = datum.get('price_history')
                    for i in ph:
                        if i.get('created_at') == str_start_date:
                            t[key] = i.get('sailing_price')
                            start_prices[key] = i.get('sailing_price')
                            is_price_formatted = True
                            break
                if not is_price_formatted:
                    t[key] = start_prices[key]
            price_history.append(t)
            start_date += datetime.timedelta(days=1)

        return Response({
            'status': True,
            'products': data,
            'price_history': price_history
        })


class ProductDetailView(generics.RetrieveAPIView):
    authentication_classes = (TokenAuthentication,)
    serializer_class = serializers.ProductDetailSerializer

    def get_queryset(self):
        return models.Product.objects.filter(sailing_price__isnull=False)


class LikeProductView(generics.CreateAPIView, generics.DestroyAPIView):
    serializer_class = serializers.LikeProductSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, OnlyActivatedUser,)
    queryset = models.LikeProduct.objects.all()


class UnLikeProductView(generics.CreateAPIView, generics.DestroyAPIView):
    serializer_class = serializers.UnLikeProductSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, OnlyActivatedUser,)
    queryset = models.UnLikeProduct.objects.all()


class ProductCommentViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ProductCommentSerializer
    permission_classes = ()

    def get_queryset(self):
        product_id = self.kwargs.get('product')
        return models.ProductComment.objects.filter(product_id=product_id)


class LikeProductCommentView(generics.CreateAPIView, generics.DestroyAPIView):
    serializer_class = serializers.LikeProductCommentSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, OnlyActivatedUser,)
    queryset = models.LikeProductComment.objects.all()


class UnLikeProductCommentView(generics.CreateAPIView, generics.DestroyAPIView):
    serializer_class = serializers.UnLikeProductCommentSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, OnlyActivatedUser,)
    queryset = models.UnLikeProductComment.objects.all()


class HomeProductView(APIView):
    authentication_classes = (TokenAuthentication,)

    @staticmethod
    def get(request):
        home_product_size = 6

        # Should be changed recommendation products
        recommend_products = models.Product.objects.filter(review_score__gte=4.9, review_count__gt=0,
                                                           sailing_price__isnull=False).order_by('-review_count')[
                             :home_product_size]

        # Today discount products
        today = datetime.datetime.now(timezone(settings.TIME_ZONE))
        today_discount_products = models.Product.objects.filter(discount_until__lte=today, sailing_price__isnull=False)[
                                  :home_product_size]

        # Time discount products
        time_discount_products = models.Product.objects.filter(discount_until__isnull=False,
                                                               sailing_price__isnull=False)[:home_product_size]

        # General discount products
        general_discount_products = models.Product.objects.filter(discount_until__isnull=True,
                                                                  original_price__isnull=False,
                                                                  sailing_price__isnull=False)[:home_product_size]

        # All discount products
        all_discount_products = models.Product.objects.filter(
            Q(discount_until__isnull=False) | Q(original_price__isnull=False), sailing_price__isnull=False)[
                                :home_product_size]

        results = {
            'recommend_products': serializers.ProductSerializer(recommend_products, many=True,
                                                                context={'request': request}).data,
            'today_discount_products': serializers.ProductSerializer(today_discount_products, many=True,
                                                                     context={'request': request}).data,
            'time_discount_products': serializers.ProductSerializer(time_discount_products, many=True,
                                                                    context={'request': request}).data,
            'general_discount_products': serializers.ProductSerializer(general_discount_products, many=True,
                                                                       context={'request': request}).data,
            'all_discount_products': serializers.ProductSerializer(all_discount_products, many=True,
                                                                   context={'request': request}).data
        }

        return Response(results, status=status.HTTP_200_OK)


class RecommendProductView(ProductListView):
    default_filters = [
        'sailing_price is not Null',
        'review_score >= 4.9',
        'review_count > 0'
    ]


class DataStatusView(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAdminUser,)

    @staticmethod
    def get(request):
        website = request.query_params.get('website')
        done_count = models.Product.objects.raw(
            '''
            SELECT count(id) as value, a.seller_en as website, MAX(id) as id
            FROM product_product as a
            LEFT JOIN (
              SELECT MAX(updated_idx) as idx, seller_en
              FROM product_product
              GROUP BY seller_en
            ) as b
            ON a.seller_en = b.seller_en
              AND a.updated_idx = b.idx
            GROUP BY a.seller_en
            '''
        )

        all_count = models.Product.objects.raw(
            '''
            SELECT count(id) as value, seller_en as website, MAX(id) as id
            FROM product_product as a
            GROUP BY seller_en
            '''
        )

        data = {}

        for idx, item in enumerate(all_count):
            data[item.website] = [{
                'name': 'Done',
                'value': item.value
            }]

        for idx, item in enumerate(done_count):
            data[item.website].append({
                'name': 'Remaining',
                'value': data[item.website][0].get('value', 0) - item.value
            })

        if website == 'all':
            total_count = 0
            all_done_count = 0
            for key, item in data.items():
                total_count += item[0].get('value')
                all_done_count += item[1].get('value') + item[0].get('value')

            data = [{
                'name': 'Done',
                'value': total_count
            }, {
                'name': 'Remaining',
                'value': total_count - all_done_count
            }]

        return Response(data, status=status.HTTP_200_OK)

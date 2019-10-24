from django.conf.urls import url, include
from django.utils.translation import ugettext_lazy as _
from rest_framework.routers import DefaultRouter

import product.views as views

router = DefaultRouter()
router.register('^(?P<product>\d+)/comment', views.ProductCommentViewSet, base_name='product_comment')


urlpatterns = [
    url(_(r'^product/(?P<pk>\d+)'), views.ProductDetailView.as_view(), name='product_detail'),
    url(_(r'^home-product/'), views.HomeProductView.as_view(), name='home_products'),
    url(_(r'^product/$'), views.ProductListView.as_view(), name='get_products'),
    url(_(r'^compare/$'), views.CompareProductView.as_view(), name='get_compare_products'),
    url(_(r'^like-product/$'), views.LikeProductView.as_view(), name='like_product'),
    url(_(r'^unlike-product/$'), views.UnLikeProductView.as_view(), name='unlike_product'),

    url(_(r'^discount/$'), views.DiscountProductListView.as_view(), name='get_discount_product'),
    url(_(r'^discount/general/$'), views.DiscountGeneralProductListView.as_view(), name='get_discount_product'),
    url(_(r'^discount/time/$'), views.DiscountTimeProductListView.as_view(), name='get_discount_product'),
    url(_(r'^discount/today/$'), views.DiscountTodayProductListView.as_view(), name='get_today_discount_product'),

    url(_(r'^analysis/(?P<id>\d+)'), views.AnalyticProductListView.as_view(), name='update_analytic_product'),
    url(_(r'^analysis'), views.AnalyticProductListView.as_view(), name='get_analytic_product'),
    url(_(r'^del-analysis'), views.AnalyticProductDeleteView.as_view(), name='delete_analytic_products'),

    url(_(r'^product-comment/'), include(router.urls)),
    url(_(r'^like-product-comment/'), views.LikeProductCommentView.as_view(), name='like_product_comment'),
    url(_(r'^unlike-product-comment/'), views.UnLikeProductCommentView.as_view(), name='unlike_product_comment'),

    url(_(r'^recommend-product/'), views.RecommendProductView.as_view(), name='unlike_product_comment'),
    url(_(r'^data-status/'), views.DataStatusView.as_view(), name='data_status'),
]

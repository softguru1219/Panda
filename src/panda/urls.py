from django.conf import settings
from django.conf.urls import include, url
from django.views.decorators.cache import cache_page

from base import views as base_views

urlpatterns = [
    url(r'^api/v1/accounts/', include('accounts.urls', namespace='accounts')),
    url(r'^api/v1/getdata/', include('base.urls', namespace='base')),
    url(r'^api/v1/user-status/', include('users_request.urls', namespace='membership')),
    url(r'^api/v1/', include('product.urls', namespace='product')),
    url(r'^api/v1/', include('blog.urls', namespace='blog')),
    url(r'^api/v1/', include('category.urls', namespace='category')),
    url(r'^api/v1/questions/', include('questions.urls', namespace='questions')),
    url(r'^api/v1/policy/', include('policy.urls', namespace='policy')),

    # catch all others because of how history is handled by react router - cache this page because it will never change
    url(r'', cache_page(settings.PAGE_CACHE_SECONDS)(base_views.IndexView.as_view()), name='index'),
]

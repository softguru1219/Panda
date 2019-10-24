from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _
from category.views import CategoryView

urlpatterns = [
    url(_(r'^category/'), CategoryView.as_view(), name='category'),
]

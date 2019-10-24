from django.conf.urls import url
from policy.views import PolicyView
from django.utils.translation import ugettext_lazy as _


urlpatterns = [
    url(_(r'^'), PolicyView.as_view(), name='policy'),
]

from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import users_request.views as views


urlpatterns = [
    url(_(r'^analysis'), views.UserStatusAnalysisView.as_view(), name='user_status_analysis'),
    url(_(r'^search/'), views.UserStatusSearchView.as_view(), name='user_status_search'),
    url(_(r'^summary/'), views.UserStatusSummaryView.as_view(), name='user_status_summary'),
]

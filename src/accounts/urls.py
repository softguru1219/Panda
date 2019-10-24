from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from django.utils.translation import ugettext_lazy as _

import accounts.views

router = DefaultRouter()
router.register(r'membership', accounts.views.MembershipViewSet, base_name='membership')
router.register(r'manage', accounts.views.ManageUserViewSet, base_name='manage_user')

urlpatterns = [
    url(_(r'^'), include(router.urls)),
    url(_(r'^register/'), accounts.views.UserRegisterView.as_view(), name='register'),
    url(_(r'^user/(?P<id>.*)/'), accounts.views.UserUpdateView.as_view(), name='update_user'),
    url(_(r'^login/$'), accounts.views.UserLoginView.as_view(), name='login'),
    url(_(r'^confirm/email/(?P<activation_key>.*)/$'), accounts.views.UserConfirmEmailView.as_view(), name='confirm_email'),
    url(_(r'^status/email/$'), accounts.views.UserEmailConfirmationStatusView.as_view(), name='status'),
    url(_(r'^send-sms/$'), accounts.views.DeviceView.as_view(), name='send_sms'),
    url(_(r'^phone-verify/$'), accounts.views.DeviceVerificationView.as_view(), name='check_sms'),
    url(_(r'^new-users-status/$'), accounts.views.NewUsersStatusView.as_view(), name='new_users_status'),
    url(_(r'^summary-membership/$'), accounts.views.MembershipList.as_view(), name='summary_membership'),
]

from django.conf.urls import url, include
from django.utils.translation import ugettext_lazy as _
from rest_framework.routers import DefaultRouter
import questions.views as views


router = DefaultRouter()
router.register(r'answer', views.AnswerViewSet, base_name='question_answer')

urlpatterns = [
    url(_(r'^'), include(router.urls)),
    url(_(r'^list/$'), views.QuestionListView.as_view(), name='user_status_analysis'),
    url(_(r'^create/$'), views.CreateQuestionView.as_view(), name='user_status_analysis'),
]

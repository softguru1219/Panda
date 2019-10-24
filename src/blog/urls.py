from django.conf.urls import url, include
from django.utils.translation import ugettext_lazy as _
from rest_framework.routers import DefaultRouter
import blog.views as views


router = DefaultRouter()
router.register('^blog-comment/(?P<blog>\d+)/comment', views.BlogCommentViewSet, base_name='blog_comment')

urlpatterns = [
    url(_(r'^'), include(router.urls)),
    url(_(r'^blog-detail/(?P<id>\d+)'), views.BlogDetailView.as_view(), name='blog_detail'),
    url(_(r'^blog/(?P<id>\d+)/'), views.BlogListView.as_view(), name='update_blog'),
    url(_(r'^blog/'), views.BlogListView.as_view(), name='blog'),

    url(_(r'^like-blog-comment/'), views.LikeBlogCommentView.as_view(), name='like_blog_comment'),
    url(_(r'^unlike-blog-comment/'), views.UnLikeBlogCommentView.as_view(), name='unlike_blog_comment'),
    url(_(r'^like-blog/'), views.LikeBlogView.as_view(), name='like_blog'),
    url(_(r'^unlike-blog/'), views.UnLikeBlogView.as_view(), name='unlike_blog'),
]

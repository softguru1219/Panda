from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, generics
from rest_framework.filters import SearchFilter
from rest_framework.parsers import MultiPartParser
import blog.serializers as serializers
import blog.models as models
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from lib.core import OnlyActivatedUser


class BlogDetailView(generics.RetrieveAPIView):
    serializer_class = serializers.BlogDetailSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return models.Blog.objects.all()


class BlogListView(generics.CreateAPIView, generics.ListAPIView, generics.UpdateAPIView):
    parser_classes = (MultiPartParser, )
    authentication_classes = (TokenAuthentication,)
    serializer_class = serializers.BlogSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, OnlyActivatedUser, )
    filter_backends = (DjangoFilterBackend, SearchFilter, )
    search_fields = ('title', 'content', )
    filterset_fields = ('title', 'content', )
    lookup_field = 'id'

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        if user_id:
            return models.Blog.objects.filter(user_id=user_id)
        else:
            return models.Blog.objects.all()


class LikeBlogView(generics.CreateAPIView, generics.DestroyAPIView):
    serializer_class = serializers.LikeBlogSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, OnlyActivatedUser,)
    queryset = models.LikeBlog.objects.all()


class UnLikeBlogView(generics.CreateAPIView, generics.DestroyAPIView):
    serializer_class = serializers.UnLikeBlogSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, OnlyActivatedUser,)
    queryset = models.UnLikeBlog.objects.all()


class BlogCommentViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.BlogCommentSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, OnlyActivatedUser,)
    authentication_classes = (TokenAuthentication,)

    def get_queryset(self):
        blog_id = self.kwargs.get('blog')
        return models.BlogComment.objects.filter(blog_id=blog_id).order_by('created_at')


class LikeBlogCommentView(generics.CreateAPIView, generics.DestroyAPIView):
    serializer_class = serializers.LikeBlogCommentSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, OnlyActivatedUser,)
    queryset = models.LikeBlogComment.objects.all()


class UnLikeBlogCommentView(generics.CreateAPIView, generics.DestroyAPIView):
    serializer_class = serializers.UnLikeBlogCommentSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, OnlyActivatedUser,)
    queryset = models.UnLikeBlogComment.objects.all()

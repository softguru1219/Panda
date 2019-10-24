from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework import exceptions
from rest_framework.compat import set_rollback
from rest_framework.views import exception_handler
from rest_framework.compat import is_authenticated


class PageNumberPaginationWithFilter(PageNumberPagination):
    """
    Paginate the products with filters and added the total page of result and page for front end.
    It does not return the Response object as we have to add the filters data to response.
    """

    def get_current_page(self):
        return self.page.number

    def get_total_pages(self):
        return self.page.paginator.num_pages

    def get_paginated_response(self, data):
        return {
            'count': self.page.paginator.count,
            'totalPages': self.get_total_pages(),
            'page': self.get_current_page(),
            'results': data
        }


class CustomPageNumberPagination(PageNumberPaginationWithFilter):
    """
    Paginate the products without filters and added the total page of result and page for front end.
    It returns the Response object.
    """
    page_size = 60
    page_size_query_param = 'page_size'
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'totalPages': self.get_total_pages(),
            'page': self.get_current_page(),
            'results': data
        })


class OnlyActivatedUser(BasePermission):
    """
    It limits the user who is not verified with email.
    """

    def has_permission(self, request, view):
        return (
            request.method in SAFE_METHODS or
            (
                request.user and
                request.user.is_active and
                request.user.confirmed_email
            )
        )


def custom_exception_handler(exc, context):
    """
    Custom Exception Handler. It makes the error message more readable.
    :param exc:
    :param context:
    :return: errors
    """
    if isinstance(exc, exceptions.APIException):
        headers = {}
        if getattr(exc, 'auth_header', None):
            headers['WWW-Authenticate'] = exc.auth_header
        if getattr(exc, 'wait', None):
            headers['Retry-After'] = '%d' % exc.wait

        user = context.get('request').user
        if isinstance(exc.detail, (list, dict)):
            data = exc.detail
            if 'user' in exc.detail:
                if not user.is_authenticated:
                    data = {'message': '请先登录', 'action': 'login'}
            elif 'email' in exc.detail and exc.default_code == 'invalid':
                data = {'message': '此电子邮件已被使用，请尝试另一个'}
            elif 'non_field_errors' in exc.detail and exc.default_code == 'invalid':
                messages = exc.get_full_details().get('non_field_errors')
                if messages and messages[0].get('code') == 'unique':
                    data = {'message': '你已经完成了这个动作'}
                else:
                    data = {'message': exc.detail.get('non_field_errors')[0]}
            else:
                data = {'message': '{} 田野错过了'.format(','.join(list(exc.detail.keys())))}
        else:
            if exc.default_code == 'permission_denied':
                if user and user.is_authenticated and not user.confirmed_email:
                    data = {'message': '请验证您的电子邮件.', 'action': 'email-verify'}
                elif user.is_authenticated and not user.is_superuser:
                    data = {'message': '您无权使用.'}
                else:
                    data = {'message': exc.detail}
            elif exc.default_code in ['not_authenticated', 'authentication_failed']:
                data = {'message': '请先登录.', 'action': 'login'}
            else:
                data = exc.detail

        set_rollback()
        return Response(data, status=exc.status_code, headers=headers)

    else:
        return exception_handler(exc, context)

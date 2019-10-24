from rest_framework.compat import is_authenticated
import datetime
from django.conf import settings
from rest_framework.permissions import BasePermission

from accounts.models import User
from users_request.models import AnonymousRequest, SearchProductRequest, AnalysisProductRequest
from category.models import FirstCategory, SecondCategory, ThirdCategory
from pytz import timezone


class AnonymousUserPermission(BasePermission):
    """
    LIMIT REQUEST FOR ANONYMOUS_USER
    """

    def has_permission(self, request, view):
        user = request.user
        if not (user and is_authenticated(user)) \
                and 'search' in request.query_params \
                and (request.query_params.get('search') or request.query_params.get(
                    'color_and_sizes') != '{}' or request.query_params.get('item_properties') != '{}'):
            user_ip = request.META.get('REMOTE_ADDR')  # getting client's ip
            user_agent = request.META.get('HTTP_USER_AGENT')  # getting client's user agent.

            AnonymousRequest.objects.create(
                user_ip=user_ip,
                user_agent=user_agent
            )

            today_max = datetime.datetime.combine(
                datetime.date.today()
                , datetime.time.max
            ).replace(tzinfo=timezone(settings.TIME_ZONE))
            today_min = datetime.datetime.combine(
                datetime.date.today(), datetime.time.min
            ).replace(tzinfo=timezone(settings.TIME_ZONE))

            return AnonymousRequest.objects.filter(
                user_ip=user_ip,
                user_agent=user_agent,
                created_at__range=[today_min, today_max]
            ).count() < settings.ANONYMOUS_USER_REQUEST_LIMIT

        return True


class FreeMemberSearchPermission(BasePermission):
    """
    LIMIT REQUEST FOR FREE MEMBER.
    """

    def has_permission(self, request, view):
        user = request.user
        if (
            user and
            is_authenticated(user) and
            user.member == User.FREE_MEMBER and
            'search' in request.query_params and
            (
                request.query_params.get('search') or
                request.query_params.get('color_and_sizes') != '{}' or
                request.query_params.get('item_properties') != '{}'
            )
        ):
            search_key = request.query_params.get('search')
            cat1 = request.query_params.get('cat1')
            cat1 = FirstCategory.objects.get(id=int(cat1)) if cat1 else None
            cat2 = request.query_params.get('cat2')
            cat2 = SecondCategory.objects.get(id=int(cat2)) if cat2 else None
            cat3 = request.query_params.get('cat3')
            cat3 = ThirdCategory.objects.get(id=int(cat3)) if cat3 else None
            color_and_sizes = request.query_params.get('color_and_sizes')
            item_properties = request.query_params.get('item_properties')

            SearchProductRequest.objects.create(
                search_key=search_key,
                user=user,
                cat1=cat1 if cat1 else None,
                cat2=int(cat2) if cat2 else None,
                cat3=int(cat3) if cat3 else None,
                color_and_sizes=color_and_sizes,
                item_properties=item_properties
            )

            today_max = datetime.datetime.combine(
                datetime.date.today()
                , datetime.time.max
            ).replace(tzinfo=timezone(settings.TIME_ZONE))
            today_min = datetime.datetime.combine(
                datetime.date.today(), datetime.time.min
            ).replace(tzinfo=timezone(settings.TIME_ZONE))

            return SearchProductRequest.objects.filter(
                user=user,
                created_at__range=[today_min, today_max]
            ).count() < settings.FREE_USER_SEARCH_REQUEST_LIMIT

        return True


class BasicAnalyticPermission(BasePermission):
    """
    LIMIT REQUEST FOR BASIC MEMBER USER.
    """

    def has_permission(self, request, view):
        user = request.user
        if (
            user and
            is_authenticated(user) and
            user.member == User.BASIC_MEMBER and
            request.method == 'PUT' and
            '/ap1/v1/analysis/' in request.path
        ):
            today = datetime.date.today()
            return AnalysisProductRequest.objects.filter(
                user=user,
                created_at__year=today.year,
                created_at__month=today.month
            ).count() < settings.BASIC_USER_ANALYTIC_RQUEST_LIMIT

        return (
            user
            and is_authenticated(user)
            and user.member == User.PRO_MEMBER
            or request.method != 'PUT'
        )

from panda.settings.base import *  # NOQA (ignore all errors on this line)


DEBUG = False
TEMPLATE_DEBUG = DEBUG

PAGE_CACHE_SECONDS = 60

# TODO: n a real production server this should have a proper url
ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'djangoreactredux_prod',
        'USER': 'panda',
        'PASSWORD': 'password',
        'HOST': 'postgres',
        'PORT': 5432,
    }
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.sendgrid.net'
EMAIL_HOST_USER = 'panda_proj'
EMAIL_HOST_PASSWORD = 'aksflak616'
EMAIL_PORT = 587
EMAIL_USE_TLS = True

# # ########### Sentry configuration

# # Change this to proper sentry url.
# RAVEN_CONFIG = {
#     'dsn': '',
# }

# INSTALLED_APPS = INSTALLED_APPS + (  # NOQA (ignore all errors on this line)
#     'raven.contrib.django.raven_compat',
# )

# # ####### Logging

# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': True,
#     'root': {
#         'level': 'WARNING',
#         'handlers': ['sentry'],
#     },
#     'formatters': {
#         'verbose': {
#             'format': '%(levelname)s %(asctime)s %(module)s '
#                       '%(process)d %(thread)d %(message)s'
#         },
#     },
#     'handlers': {
#         'sentry': {
#             'level': 'ERROR',
#             'class': 'raven.contrib.django.raven_compat.handlers.SentryHandler',
#         },
#         'console': {
#             'level': 'DEBUG',
#             'class': 'logging.StreamHandler',
#             'formatter': 'verbose'
#         }
#     },
#     'loggers': {
#         'django.db.backends': {
#             'level': 'ERROR',
#             'handlers': ['console'],
#             'propagate': False,
#         },
#         'raven': {
#             'level': 'DEBUG',
#             'handlers': ['sentry'],
#             'propagate': False,
#         },
#         'sentry.errors': {
#             'level': 'DEBUG',
#             'handlers': ['sentry'],
#             'propagate': False,
#         },
#     },
# }

# DEFAULT_LOGGER = 'raven'

# LOGGER_EXCEPTION = DEFAULT_LOGGER
# LOGGER_ERROR = DEFAULT_LOGGER
# LOGGER_WARNING = DEFAULT_LOGGER

# ############ TWILIO SETTING ########################
TWILIO_ACCOUNT_SID = "AC56846ef24648490d3544ef94afbf01c3"
TWILIO_AUTH_TOKEN = "37c047ad0271eaa0beaf0c8da7b8fb5b"

TWILIO_CALLER_ID = "+8613188370953"
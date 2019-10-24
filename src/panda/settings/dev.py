from panda.settings.base import *  # NOQA (ignore all errors on this line)


DEBUG = True

PAGE_CACHE_SECONDS = 1

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'panda',
        'USER': 'postgres',
        'PASSWORD': 'root',
        'HOST': '192.168.0.115',
        'PORT': 5432,
    }
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'shadowofgoodluck@gmail.com'
EMAIL_HOST_PASSWORD = 'sihn@shadow'

LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'root': {
        'level': 'DEBUG',
        'handlers': ['django_rest_logger_handler'],
    },
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s '
                      '%(process)d %(thread)d %(message)s'
        },
    },
    'handlers': {
        'django_rest_logger_handler': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose'
        }
    },
    'loggers': {
        'django.db.backends': {
            'level': 'ERROR',
            'handlers': ['django_rest_logger_handler'],
            'propagate': False,
        },
        'django_rest_logger': {
            'level': 'DEBUG',
            'handlers': ['django_rest_logger_handler'],
            'propagate': False,
        },
    },
}

DEFAULT_LOGGER = 'django_rest_logger'

LOGGER_EXCEPTION = DEFAULT_LOGGER
LOGGER_ERROR = DEFAULT_LOGGER
LOGGER_WARNING = DEFAULT_LOGGER

# ############ TWILIO SETTING ########################
TWILIO_ACCOUNT_SID = "AC1cb2527a8a1f54a303f77f5018327dc6"
TWILIO_AUTH_TOKEN = "845b1199eb3d8d0242da83259bff7aff"
TWILIO_CALLER_ID = "+15005550006"

# TWILIO_ACCOUNT_SID = "AC56846ef24648490d3544ef94afbf01c3"
# TWILIO_AUTH_TOKEN = "37c047ad0271eaa0beaf0c8da7b8fb5b"
# TWILIO_CALLER_ID = "+8613942533619"
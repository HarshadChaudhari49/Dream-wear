from .base import *  # noqa: F401,F403
import os
import dj_database_url  # add dj-database-url to requirements/prod.txt if using this pattern

DEBUG = False

ALLOWED_HOSTS = [h.strip() for h in os.environ.get("ALLOWED_HOSTS", "").split(",") if h.strip()]

DATABASES = {
    "default": dj_database_url.config(default=os.environ.get("DATABASE_URL", ""))
}

SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")  # noqa: F405

# Sentry, logging, etc. — wire up before first real deploy. See architecture
# doc Section 11.1 for the list of pre-launch infra decisions still open.

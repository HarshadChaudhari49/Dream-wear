# dream-atelier-api

Django REST Framework backend for Dream Atelier. The single source of truth for data and business logic — both `dream-atelier-mobile` and `dream-atelier-web` are pure consumers of this API.

Full system design lives in the companion document **Dream-Atelier_Architecture_v1.docx**. Product behavior lives in **Dream-to-Wear_PRD_v1.docx**. This README only covers running the code.

## Stack

Django 5 · Django REST Framework · PostgreSQL · Redis (cache/Celery) · Cloudinary (media) · Razorpay (payments)

## Local setup

```bash
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate

cp .env.example .env               # then fill in real values
pip install -r requirements/dev.txt

# Requires a running PostgreSQL instance matching your .env DB_* settings
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

API is now at `http://localhost:8000/api/`, admin at `http://localhost:8000/admin/`.

## Running tests

```bash
pytest
```

## Project layout

```
config/             Settings (base/dev/prod), root urls, wsgi/asgi
apps/
  core/             Shared abstract base model, pagination — no endpoints
  accounts/         Phone OTP auth, user profile
  dreams/           Dream submission, status workflow, consent gate, stage tracking
  catalog/          Products, banners, search/filter
  orders/           Cart, checkout, Razorpay, order tracking
  wardrobe/         Wishlist, purchase history with dream-origin callbacks
  notifications/    Notification model + calm-tone copy enforcement
  ops/              Cross-app admin customizations only — no models, no API endpoints
requirements/       base.txt / dev.txt / prod.txt
docs/               Architecture notes specific to this repo
```

## Adding a new app/feature

See **Section 10** of the architecture document for the exact step-by-step. Summary: `startapp` inside `apps/`, register it in `INSTALLED_APPS`, give it its own `models.py` / `serializers.py` / `views.py` / `urls.py` / `admin.py` / `tests.py`, wire one `include()` line into `config/urls.py`. No existing app's internals should need to change.

## The one rule that matters most

A `Product` can only be created from a `Dream` that has reached `delivered_to_dreamer` status **and** has `consent_to_publish = True`, granted through the dedicated consent endpoint — never through a generic update. This is enforced in `apps/dreams/services.py` and `apps/catalog/services.py`, not just in the UI. See architecture doc Section 6.1 before changing any of that logic.

## CLAUDE.md

This repo has its own `CLAUDE.md` with conventions specific to this codebase. It assumes your general AI-coding behavioral guidelines (think before coding, simplicity first, surgical changes, goal-driven execution) are already in effect and adds only what's specific to this repo.

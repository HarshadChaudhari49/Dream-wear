# Dream Atelier — Full Project Setup Guide

A custom women's clothing platform where a woman describes her dream outfit,
a tailor makes it, she receives it first, and with her consent it becomes a
product others can discover and buy.

---

## What's inside this repo

```
Dream-wear/
├── dream-atelier-api/      Django 5 + DRF backend (REST API + Admin)
├── dream-atelier-web/      React + Vite + TypeScript web app
└── dream-atelier-mobile/   React Native + Expo mobile app (iOS & Android)
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python 3.10+, Django 5, Django REST Framework, PostgreSQL |
| Auth | Phone OTP + JWT (SimpleJWT) |
| Payments | Razorpay (optional in dev) |
| Web frontend | React 18, Vite, TypeScript, React Query v5, React Router v6 |
| Mobile | React Native, Expo SDK, React Query v5 |
| Styling | Inline styles + shared design tokens (no CSS framework) |
| Fonts | Playfair Display, Inter, Dancing Script (Google Fonts) |

---

## Prerequisites — install these first

| Tool | Version | Download |
|---|---|---|
| Python | 3.10 or higher | https://python.org |
| Node.js | 18 or higher | https://nodejs.org |
| PostgreSQL | 14 or higher | https://postgresql.org |
| Git | any | https://git-scm.com |
| Expo CLI (mobile only) | latest | `npm install -g expo-cli` |

---

## Step 1 — Clone the repo

```bash
git clone https://github.com/HarshadChaudhari49/Dream-wear.git
cd Dream-wear
```

---

## Step 2 — Backend setup (`dream-atelier-api`)

### 2.1 Create a virtual environment

```bash
cd dream-atelier-api
python -m venv venv
```

Activate it:

```bash
# Windows
venv\Scripts\activate

# Mac / Linux
source venv/bin/activate
```

### 2.2 Install dependencies

```bash
pip install -r requirements/dev.txt
```

### 2.3 Create the database

Open PostgreSQL and run:

```sql
CREATE DATABASE dream_atelier;
```

### 2.4 Create your `.env` file

Copy the example and fill in your values:

```bash
cp .env.example .env
```

Open `.env` and set:

```
SECRET_KEY=any-long-random-string
DEBUG=True
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/dream_atelier
RAZORPAY_KEY_ID=        # leave blank in dev — checkout still works
RAZORPAY_KEY_SECRET=    # leave blank in dev
```

### 2.5 Run migrations

```bash
python manage.py migrate
```

### 2.6 Create a superuser (for admin panel)

```bash
python manage.py createsuperuser
```

It will ask for a phone number and password. Use any 10-digit number e.g. `9999999999`.

### 2.7 Seed sample data (products, dreams, banner)

```bash
python manage.py seed
```

This creates:
- 6 sample products
- 1 banner
- 4 dreams
- 1 dreamer account: phone `9876543210`

### 2.8 Start the API server

```bash
python manage.py runserver
```

API is now running at **http://localhost:8000**
Admin panel at **http://localhost:8000/admin**

---

## Step 3 — Web app setup (`dream-atelier-web`)

Open a **new terminal**.

```bash
cd dream-atelier-web
npm install
```

### 3.1 Create `.env` file

```bash
cp .env.example .env
```

Contents of `.env`:

```
VITE_API_BASE_URL=http://localhost:8000/api
```

### 3.2 Start the dev server

```bash
npm run dev
```

Web app is now running at **http://localhost:5173** (or whichever port Vite picks).

---

## Step 4 — Mobile app setup (`dream-atelier-mobile`)

Open a **new terminal**.

```bash
cd dream-atelier-mobile
npm install
```

### 4.1 Create `.env` file

```bash
cp .env.example .env
```

Contents of `.env`:

```
EXPO_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

> **Note:** If running on a physical device, replace `localhost` with your
> machine's local IP address (e.g. `192.168.1.5`).

### 4.2 Start Expo

```bash
npx expo start
```

- Press **`w`** to open in browser
- Press **`a`** to open Android emulator
- Press **`i`** to open iOS simulator
- Scan QR code with **Expo Go** app on your phone

---

## How to sign in (OTP flow)

1. Open the web or mobile app
2. Enter any phone number that exists in the database
3. The OTP is **printed to the Django terminal** (in DEBUG mode — no SMS sent in dev)
4. Enter the 6-digit OTP shown in the terminal
5. You are now logged in

**Test accounts:**
| Role | Phone | Password (admin only) |
|---|---|---|
| Admin | 9999999999 | admin123 |
| Dreamer | 9876543210 | OTP printed to terminal |

---

## Project structure explained

```
dream-atelier-api/
├── apps/
│   ├── accounts/       User model, phone OTP auth, JWT
│   ├── dreams/         Dream submission, stage tracking, consent flow
│   ├── catalog/        Products, banners, search & filter
│   ├── orders/         Cart, checkout, Razorpay, order tracking
│   ├── wardrobe/       Wishlist, purchase history
│   ├── notifications/  In-app notifications (calm-tone enforced)
│   ├── ops/            Cross-app admin actions
│   └── core/           Shared base model (UUID + timestamps)
├── config/
│   └── settings/
│       ├── base.py     Shared settings
│       └── dev.py      Development overrides
└── requirements/
    ├── base.txt        Production dependencies
    └── dev.txt         Dev + test dependencies

dream-atelier-web/
└── src/
    ├── features/       One folder per product module (api + hooks + pages)
    ├── shared/         Reusable components, tokens, styles
    ├── contexts/       AuthContext (login/logout state)
    ├── routes/         React Router config
    └── services/       Axios client with auto token refresh

dream-atelier-mobile/
└── src/
    ├── features/       Same structure as web (api + hooks + screens)
    ├── shared/         Shared components and tokens
    └── services/       Axios client
```

---

## Key business rule — read this before contributing

> A product can only be created from a Dream **after** it has been delivered
> to the dreamer AND she has explicitly given consent. This is enforced in
> `dream-atelier-api/apps/dreams/services.py` — never bypass it by setting
> fields directly.

---

## Git workflow for contributors

```bash
# 1. Always start from latest main
git checkout main
git pull origin main

# 2. Create a branch for your work
git checkout -b feature/your-feature-name

# 3. Make changes, commit often
git add .
git commit -m "short description of what you did"

# 4. Push your branch
git push origin feature/your-feature-name

# 5. Open a Pull Request on GitHub → get reviewed → merge
```

**Branch naming:**

| Prefix | Use for |
|---|---|
| `feature/` | New features |
| `fix/` | Bug fixes |
| `api/` | Backend-only changes |
| `web/` | Web frontend changes |
| `mobile/` | Mobile app changes |

**Never push directly to `main`.**

---

## Running all three at once

You need **three terminals** open simultaneously:

| Terminal | Command | URL |
|---|---|---|
| 1 | `cd dream-atelier-api && python manage.py runserver` | http://localhost:8000 |
| 2 | `cd dream-atelier-web && npm run dev` | http://localhost:5173 |
| 3 | `cd dream-atelier-mobile && npx expo start` | Expo QR / emulator |

---

## Common errors

| Error | Fix |
|---|---|
| `ModuleNotFoundError: No module named 'django'` | Virtual environment not activated — run `venv\Scripts\activate` |
| `FATAL: database "dream_atelier" does not exist` | Create the DB: `CREATE DATABASE dream_atelier;` in PostgreSQL |
| `Invalid OTP` | OTP expires — request a new one and check the Django terminal again |
| `Network request failed` on mobile | Replace `localhost` in `.env` with your machine's IP address |
| Port 8000 already in use | `python manage.py runserver 8001` and update `VITE_API_BASE_URL` |

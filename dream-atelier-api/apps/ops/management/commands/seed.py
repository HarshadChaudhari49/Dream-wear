"""
Seed the database with realistic demo data for local development.
Run once: python manage.py seed
Re-runnable: calling again skips rows that already exist.
"""
from django.core.management.base import BaseCommand
from django.utils import timezone
from django.db import transaction


PRODUCTS = [
    {
        "title": "The Morning Kurti",
        "category": "kurti",
        "mood_tags": ["soft", "minimal"],
        "price_inr": "1890.00",
        "model_photo_url": "https://images.unsplash.com/photo-1614093302611-8efc6370d943?w=600&q=80",
        "description": "Ivory mul-mul with pintuck detailing at the yoke. Wide sleeves that catch every breeze. The kind of piece you reach for on slow mornings.",
    },
    {
        "title": "Rust Block-Print Kurta",
        "category": "kurti",
        "mood_tags": ["bold", "classic"],
        "price_inr": "2350.00",
        "model_photo_url": "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80",
        "description": "Hand block-printed in Jaipur on a rust-orange base. No two pieces are exactly alike — the slight imperfections are the signature.",
    },
    {
        "title": "Sage Linen Coord Set",
        "category": "co_ord_set",
        "mood_tags": ["minimal", "classic"],
        "price_inr": "3200.00",
        "model_photo_url": "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80",
        "description": "Washed sage linen — top with side slits, wide-leg trousers. Effortless for a work day that flows into an evening.",
    },
    {
        "title": "Midnight Floral Top",
        "category": "top",
        "mood_tags": ["romantic", "bold"],
        "price_inr": "1450.00",
        "model_photo_url": "https://images.unsplash.com/photo-1548116137-c9ac24e446c9?w=600&q=80",
        "description": "Deep navy with embroidered florals at the neckline. Wear with your favourite jeans or tuck into a flowy skirt.",
    },
    {
        "title": "Ivory Smocked Dress",
        "category": "dress",
        "mood_tags": ["romantic", "soft"],
        "price_inr": "2800.00",
        "model_photo_url": "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&q=80",
        "description": "Smocked bodice, tiered skirt that swirls when you move. Made for the woman who dresses for herself.",
    },
    {
        "title": "Indigo Hand-Woven Top",
        "category": "top",
        "mood_tags": ["edgy", "minimal"],
        "price_inr": "1650.00",
        "model_photo_url": "https://images.unsplash.com/photo-1594938298603-c8148c4b4552?w=600&q=80",
        "description": "Handloom indigo with a structured cut. Each thread was woven by hand — you can feel the intention in the fabric.",
    },
]

DREAMS = [
    {
        "free_text": "I keep imagining something ivory and flowing, with wide sleeves that catch the wind when I walk. Something I could wear on a slow Sunday morning with chai in hand but still feel beautiful in — not too formal, not too casual. Like wearing a soft cloud.",
        "mood_tags": ["soft", "minimal"],
        "occasion_tag": "everyday",
        "feeling_prompt": "Like wearing a quiet confidence, effortless but intentional.",
        "status": "in_progress",
    },
    {
        "free_text": "A rust-orange kurta with some hand block print. I saw one in a market in Jaipur years ago and I never bought it and I have regretted it ever since. I want something with that warmth, that imperfect handmade quality, not the perfect machine-made version.",
        "mood_tags": ["bold", "classic"],
        "occasion_tag": "celebration",
        "feeling_prompt": "Rooted. Like wearing something with a story.",
        "status": "delivered_to_dreamer",
    },
    {
        "free_text": "Something for work that doesn't feel like 'work clothes'. I want a coord set in linen — sage or olive green — that I can wear to a meeting and then straight to dinner without changing. Comfortable but polished. Relaxed but intentional.",
        "mood_tags": ["minimal", "classic"],
        "occasion_tag": "everyday",
        "feeling_prompt": "Put-together without trying too hard.",
        "status": "submitted",
    },
    {
        "free_text": "A midnight navy top with delicate floral embroidery at the neckline. Not too heavy, not too sparse — just enough that when someone looks closely they notice it and say oh, that's beautiful. I want something that rewards a closer look.",
        "mood_tags": ["romantic", "bold"],
        "occasion_tag": "just_for_me",
        "feeling_prompt": "Like a quiet secret I'm wearing.",
        "status": "live",
    },
]

BANNER = {
    "image_url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    "headline": "Every piece here started as someone's dream.",
    "deep_link": "/dreams",
    "sort_order": 1,
}

DESIGNER = {
    "name": "Meera Textile Studio",
    "specialty": "Hand block print, mul-mul, and linen tailoring",
    "contact_info": "Jaipur, Rajasthan",
}


class Command(BaseCommand):
    help = "Seed the database with realistic demo data for development"

    @transaction.atomic
    def handle(self, *args, **options):
        from apps.accounts.models import User
        from apps.catalog.models import Product, Banner
        from apps.dreams.models import Dream, DesignerTailor, DreamStatus

        # ── Designer/tailor ──────────────────────────────────────────────
        designer, created = DesignerTailor.objects.get_or_create(
            name=DESIGNER["name"],
            defaults=DESIGNER,
        )
        if created:
            self.stdout.write(f"  Created designer: {designer.name}")

        # ── Seed user (the dreamer) ───────────────────────────────────────
        dreamer, created = User.objects.get_or_create(
            phone="9876543210",
            defaults={"name": "Priya Sharma"},
        )
        if created:
            dreamer.set_unusable_password()
            dreamer.save()
            self.stdout.write("  Created dreamer user: 9876543210")

        # ── Products ─────────────────────────────────────────────────────
        products = []
        for p in PRODUCTS:
            obj, created = Product.objects.get_or_create(
                title=p["title"],
                defaults={
                    **p,
                    "is_publishable": True,
                    "published_at": timezone.now(),
                    "save_count": __import__("random").randint(4, 48),
                    "love_count": __import__("random").randint(2, 30),
                },
            )
            products.append(obj)
            if created:
                self.stdout.write(f"  Created product: {obj.title}")

        # ── Banner ───────────────────────────────────────────────────────
        _, created = Banner.objects.get_or_create(
            headline=BANNER["headline"],
            defaults=BANNER,
        )
        if created:
            self.stdout.write("  Created banner")

        # ── Dreams ───────────────────────────────────────────────────────
        for d in DREAMS:
            obj, created = Dream.objects.get_or_create(
                user=dreamer,
                free_text=d["free_text"],
                defaults={k: v for k, v in d.items() if k != "free_text"},
            )
            if created:
                if obj.status in (DreamStatus.IN_PROGRESS, DreamStatus.DELIVERED_TO_DREAMER):
                    obj.assigned_designer = designer
                    obj.save(update_fields=["assigned_designer"])
                if obj.status == DreamStatus.DELIVERED_TO_DREAMER:
                    obj.consent_to_publish = True
                    obj.save(update_fields=["consent_to_publish"])
                self.stdout.write(f"  Created dream: [{obj.status}] {obj.free_text[:60]}…")

        # ── Wire a live dream → product (the "live" showcase entry) ─────
        live_dream = Dream.objects.filter(
            user=dreamer, status=DreamStatus.LIVE
        ).first()
        if live_dream and not hasattr(live_dream, "product"):
            navy_top = Product.objects.filter(title="Midnight Floral Top").first()
            if navy_top and not navy_top.origin_dream_id:
                navy_top.origin_dream = live_dream
                navy_top.save(update_fields=["origin_dream"])
                live_dream.consent_to_publish = True
                live_dream.save(update_fields=["consent_to_publish"])
                self.stdout.write("  Linked live dream -> Midnight Floral Top")

        self.stdout.write(self.style.SUCCESS("\nSeed complete."))
        self.stdout.write("  Admin login:   phone=9999999999  password=admin123")
        self.stdout.write("  Dreamer OTP:   phone=9876543210  (use any 6-digit code in DEBUG mode)")
        self.stdout.write("  API browsable: http://localhost:8000/api/products/")
        self.stdout.write("  Admin panel:   http://localhost:8000/admin/")

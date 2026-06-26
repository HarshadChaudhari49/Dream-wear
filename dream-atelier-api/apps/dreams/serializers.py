from rest_framework import serializers
from .models import Dream, DreamStage, DreamInspirationImage


class DreamStageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DreamStage
        fields = ["id", "stage_name", "photo_url", "notes", "created_at"]


class DreamInspirationImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DreamInspirationImage
        fields = ["id", "image_url"]


class DreamListSerializer(serializers.ModelSerializer):
    """Lightweight shape for the My Dreams list view (PRD Module 4, Section 9.1)."""

    first_line = serializers.SerializerMethodField()

    class Meta:
        model = Dream
        fields = ["id", "first_line", "status", "created_at"]

    def get_first_line(self, obj):
        return (obj.free_text or "").split("\n")[0][:140]


class DreamDetailSerializer(serializers.ModelSerializer):
    """Full shape for Dream detail / stage tracker (PRD Module 4, Section 9.4)."""

    stages = DreamStageSerializer(many=True, read_only=True)
    inspiration_images = DreamInspirationImageSerializer(many=True, read_only=True)
    product_id = serializers.SerializerMethodField()
    love_count = serializers.SerializerMethodField()
    save_count = serializers.SerializerMethodField()

    class Meta:
        model = Dream
        fields = [
            "id", "free_text", "mood_tags", "occasion_tag", "feeling_prompt",
            "status", "consent_to_publish", "stages", "inspiration_images",
            "product_id", "love_count", "save_count", "created_at",
        ]
        read_only_fields = ["id", "status", "consent_to_publish", "created_at"]

    def get_product_id(self, obj):
        try:
            return str(obj.product.id)
        except Exception:
            return None

    def get_love_count(self, obj):
        try:
            return obj.product.love_count
        except Exception:
            return 0

    def get_save_count(self, obj):
        try:
            return obj.product.save_count
        except Exception:
            return 0


class DreamCreateSerializer(serializers.ModelSerializer):
    """PRD Module 3, Part 1: the actual submission payload from either frontend."""

    class Meta:
        model = Dream
        fields = ["free_text", "mood_tags", "occasion_tag", "feeling_prompt"]

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)

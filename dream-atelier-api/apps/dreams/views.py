from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.exceptions import ValidationError
from .models import Dream, DreamStatus
from .serializers import DreamListSerializer, DreamDetailSerializer, DreamCreateSerializer
from . import services


class DreamListCreateView(generics.ListCreateAPIView):
    """GET: my dreams (PRD Module 4). POST: submit a new dream (PRD Module 3, Part 1)."""

    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Dream.objects.filter(user=self.request.user).select_related("product")

    def get_serializer_class(self):
        return DreamCreateSerializer if self.request.method == "POST" else DreamListSerializer

    def create(self, request, *args, **kwargs):
        """Return full DreamDetail shape after creation so the frontend has id/status/stages."""
        serializer = DreamCreateSerializer(data=request.data, context=self.get_serializer_context())
        serializer.is_valid(raise_exception=True)
        dream = serializer.save()
        return Response(DreamDetailSerializer(dream, context=self.get_serializer_context()).data, status=status.HTTP_201_CREATED)


class DreamDetailView(generics.RetrieveAPIView):
    """Dream detail with stages — PRD Module 4, Section 9.4 stage tracker."""

    serializer_class = DreamDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Dream.objects.filter(user=self.request.user).select_related("product")


class DreamConsentView(APIView):
    """
    POST { action: 'request' | 'grant' | 'decline' }.
    Every transition goes through apps.dreams.services — see that module's
    docstring for why this can't be a generic PATCH.
    """

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        dream = Dream.objects.filter(pk=pk, user=request.user).first()
        if not dream:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        action = request.data.get("action")
        try:
            if action == "request":
                services.request_consent(dream)
            elif action == "grant":
                services.grant_consent(dream)
            elif action == "decline":
                services.decline_consent(dream)
            else:
                return Response({"detail": "action must be request, grant, or decline."}, status=400)
        except ValidationError as exc:
            return Response({"detail": str(exc)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(DreamDetailSerializer(dream).data)


class DreamFeedView(generics.ListAPIView):
    """
    Public Showcase feed (PRD Module 3, Part 2) — only Live, consented dreams.
    No auth required; this is the trust mechanism new visitors see first.
    """

    serializer_class = DreamDetailSerializer
    permission_classes = [permissions.AllowAny]
    queryset = (
        Dream.objects
        .filter(status=DreamStatus.LIVE, consent_to_publish=True)
        .select_related("product")
        .prefetch_related("stages")
    )

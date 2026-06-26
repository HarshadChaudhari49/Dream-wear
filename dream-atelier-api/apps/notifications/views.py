from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Notification
from .serializers import NotificationSerializer


class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)


class MarkNotificationReadView(APIView):
    """PATCH /api/notifications/<pk>/read/ — marks one notification as read."""
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):
        updated = Notification.objects.filter(pk=pk, user=request.user).update(read=True)
        if not updated:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response({"read": True})


class MarkAllReadView(APIView):
    """PATCH /api/notifications/read-all/ — marks every unread notification as read."""
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request):
        count = Notification.objects.filter(user=request.user, read=False).update(read=True)
        return Response({"marked_read": count})

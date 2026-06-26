from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from .models import User
from .serializers import UserSerializer, OTPRequestSerializer, OTPVerifySerializer
from .services import generate_and_send_otp, verify_otp


class RequestOTPView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = OTPRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        generate_and_send_otp(serializer.validated_data["phone"])
        return Response({"detail": "OTP sent."}, status=status.HTTP_200_OK)


class VerifyOTPView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = OTPVerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        phone = serializer.validated_data["phone"]
        code = serializer.validated_data["code"]

        if not verify_otp(phone, code):
            return Response({"detail": "Invalid or expired code."}, status=status.HTTP_400_BAD_REQUEST)

        user, _ = User.objects.get_or_create(phone=phone)
        refresh = RefreshToken.for_user(user)
        return Response({
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh),
            "user": UserSerializer(user).data,
        })


class TokenRefreshView(APIView):
    """
    Accepts { refresh_token } (frontend convention) instead of simplejwt's
    default { refresh }, and returns { access_token, refresh_token } to match
    what apiClient.ts expects.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        refresh_value = request.data.get("refresh_token") or request.data.get("refresh")
        if not refresh_value:
            return Response({"detail": "refresh_token is required."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = TokenRefreshSerializer(data={"refresh": refresh_value})
        try:
            serializer.is_valid(raise_exception=True)
        except (TokenError, InvalidToken) as exc:
            return Response({"detail": str(exc)}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({
            "access_token": serializer.validated_data["access"],
            "refresh_token": serializer.validated_data.get("refresh", refresh_value),
        })


class MeView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

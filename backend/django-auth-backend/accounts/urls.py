from django.urls import path
from .views import UserListView, RegisterView, PasswordResetRequestView, PasswordResetConfirmView
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("users/", UserListView.as_view(), name="user-list"),
    path("register/", RegisterView.as_view(), name="register"),
    path("", lambda request: JsonResponse({"message": "API root"})),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/reset-password/", PasswordResetRequestView.as_view()),
    path("api/reset-password/confirm/<uidb64>/<token>/", PasswordResetConfirmView.as_view()),
]

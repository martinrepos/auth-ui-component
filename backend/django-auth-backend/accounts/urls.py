from django.urls import path
from .views import UserListView
from django.http import JsonResponse


urlpatterns = [
    path("users/", UserListView.as_view(), name="user-list"),
    path("", lambda request: JsonResponse({"message": "API root"})),
]

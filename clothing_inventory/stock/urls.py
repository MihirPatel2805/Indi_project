from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductView, OrderViewSet


urlpatterns = [
    path('additems/',ProductView.as_view() ),
]

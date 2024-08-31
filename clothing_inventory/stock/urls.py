from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductView, OrderViewSet, ViewStockView,SearchItems


urlpatterns = [
    path('additems/',ProductView.as_view() ),
    path('viewstock',ViewStockView.as_view() ),
    path('searchItems',SearchItems.as_view()),
]

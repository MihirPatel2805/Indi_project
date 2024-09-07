from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductView, OrderViewSet, ViewStockView,SearchItems,AddParties,ViewParties


urlpatterns = [
    path('additems/',ProductView.as_view()),
    path('viewstock',ViewStockView.as_view()),
    path('searchItems',SearchItems.as_view()),
    path('addParties/',AddParties.as_view()),
    path('viewParties/',ViewParties.as_view()),
]

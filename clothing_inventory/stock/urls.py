from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductView,ViewStockView,SearchItems,AddParties,ViewParties,AddStock,AddOrderListView,GetOrderView,AddPurchaseListView,GetPurchaseView,GetOrderDetailView


urlpatterns = [
    path('additems/',ProductView.as_view()),
    path('viewstock',ViewStockView.as_view()),
    path('searchItems',SearchItems.as_view()),
    path('addParties/',AddParties.as_view()),
    path('viewParties/',ViewParties.as_view()),
    path('addStock/',AddStock.as_view()),
    path('addOrderItems/',AddOrderListView.as_view()),
    path('getOrderHistory/',GetOrderView.as_view()),
    path('addPurchareItems/',AddPurchaseListView.as_view()),
    path('getPurchaseHistory/',GetPurchaseView.as_view()),
    path('getOrderDetails/<str:pk>',GetOrderDetailView.as_view()),
    path('getPurchaseDetails/<str:pk>',GetOrderDetailView.as_view()),
]

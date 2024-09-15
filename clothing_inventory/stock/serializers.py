from rest_framework import serializers
from .models import Product, OrderList, Parties,PurchaseList


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
class PartiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parties
        fields = '__all__'
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderList
        fields = '__all__'

class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseList
        fields = '__all__'
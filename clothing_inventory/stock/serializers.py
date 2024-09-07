from rest_framework import serializers
from .models import Product, Order, Parties


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
        model = Order
        fields = '__all__'
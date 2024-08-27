from rest_framework import serializers
from .models import Product, Order

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['design_no', 'total_pieces', 'pieces_set', 'color', 'price', 'image']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
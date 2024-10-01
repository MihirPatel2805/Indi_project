from rest_framework import serializers
from .models import Product, OrderList, Parties,PurchaseList


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields =['id','design_no','total_set','color','price','image']
class PartiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parties
        fields = '__all__'
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderList
        fields = ['_id','party_name','party_details','date','orderList','total_price']

class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseList
        fields = '__all__'
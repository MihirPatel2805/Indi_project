from bson import ObjectId
# Create your models here.
from django.db import models
from djongo.models import ObjectIdField
class Product(models.Model):
    design_no = models.CharField(max_length=100,unique=True)
    total_set = models.IntegerField()
    color = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='product_images')

class Parties(models.Model):
    party_name = models.CharField(max_length=100,default="NA")
    mobile = models.CharField(max_length=10,default="NA")
    gst_number = models.CharField(max_length=100,unique=True,default="NA")
    address = models.CharField(max_length=100,default="NA")


class OrderList(models.Model):
    party_name = models.CharField(max_length=100,default="NA")
    party_details = models.JSONField(default=dict)
    date = models.DateField(auto_now=True)
    orderList = models.JSONField(default=dict)
    total_price = models.DecimalField(max_digits=10, decimal_places=2 ,default=0)

class PurchaseList(models.Model):
    party_name = models.CharField(max_length=100,default="NA")
    party_details = models.JSONField(default=dict)
    date = models.DateField(auto_now=True)
    purchaseList = models.JSONField(default=dict)
    total_price = models.DecimalField(max_digits=10, decimal_places=2 ,default=0)
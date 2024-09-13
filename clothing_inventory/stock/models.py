
# Create your models here.
from django.db import models

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


class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    status = models.CharField(max_length=50, default='Pending')
    date_ordered = models.DateTimeField(auto_now_add=True)

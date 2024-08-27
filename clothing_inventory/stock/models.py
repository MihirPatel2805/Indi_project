from django.db import models

# Create your models here.
from django.db import models

class Product(models.Model):
    design_no = models.CharField(max_length=100,unique=True)
    total_pieces = models.IntegerField()
    pieces_set = models.JSONField()  #{'M': 10, 'L': 20, 'XL': 15, 'XXL': 5}
    color = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.CharField(max_length=600)

class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    status = models.CharField(max_length=50, default='Pending')
    date_ordered = models.DateTimeField(auto_now_add=True)

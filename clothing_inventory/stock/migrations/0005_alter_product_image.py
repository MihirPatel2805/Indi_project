# Generated by Django 4.1.13 on 2024-08-27 10:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0004_alter_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(upload_to='product_images'),
        ),
    ]

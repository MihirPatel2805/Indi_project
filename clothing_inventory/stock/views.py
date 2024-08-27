from django.shortcuts import render
from rest_framework import viewsets
from .models import Product, Order
from .serializers import ProductSerializer, OrderSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pymongo
from django.conf import settings
class ProductView(APIView):
    def post(self, request):
        print(request.data)
        serializer = ProductSerializer(data={'design_no': request.data['design_no'],'total_pieces':0,'pieces_set':{'M': 0, 'L': 0, 'XL': 0, 'XXL': 0},'color': request.data['color'], 'price': int(request.data['price']),
                                             'image': request.data['image']})
        print(settings.DATABASES)
        if serializer.is_valid():
            user_email = request.data['email']  # Or however you identify the user
            user_db_name = user_email.replace('@', '_').replace('.', '_') + '_db'  # Convert email to db name
            settings.DATABASES[user_db_name] = {
                'ENGINE': 'djongo',
                'NAME': user_db_name,
                'CLIENT': {
                    'host': settings.DATABASES['default']['CLIENT']['host'],
                    'username': settings.DATABASES['default']['CLIENT']['username'],
                    'password': settings.DATABASES['default']['CLIENT']['password'],
                    'authMechanism': 'SCRAM-SHA-1',
                },
                'TIME_ZONE': settings.DATABASES['default'].get('TIME_ZONE', 'UTC'),
                'OPTIONS': settings.DATABASES['default'].get('OPTIONS', {}),
                'CONN_HEALTH_CHECKS': settings.DATABASES['default'].get('CONN_HEALTH_CHECKS', False),
                'CONN_MAX_AGE': settings.DATABASES['default'].get('CONN_MAX_AGE', 0),
                'AUTOCOMMIT': settings.DATABASES['default'].get('AUTOCOMMIT', True),
                'ATOMIC_REQUESTS': settings.DATABASES['default'].get('ATOMIC_REQUESTS', False),
            }
            try:
            # Instead of serializer.save(), we manually create an instance and save it to the specific database
                product_instance = Product(**serializer.validated_data)
                product_instance.save(using=user_db_name)  # Save to the specific user's database

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ViewStockView(APIView):
    def get(self, request):
        """
        Fetch all products from the specific user's database.
        """
        user_email = request.query_params.get('email')  # Get user email from query parameters
        if not user_email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Convert the email to a database name format
        user_db_name = user_email.replace('@', '_').replace('.', '_') + '_db'

        # Construct a new database configuration using settings
        settings.DATABASES[user_db_name] = {
            'ENGINE': 'djongo',
            'NAME': user_db_name,
            'CLIENT': {
                'host': settings.DATABASES['default']['CLIENT']['host'],
                'username': settings.DATABASES['default']['CLIENT']['username'],
                'password': settings.DATABASES['default']['CLIENT']['password'],
                'authMechanism': 'SCRAM-SHA-1',
            },
            'TIME_ZONE': settings.DATABASES['default'].get('TIME_ZONE', 'UTC'),
            'OPTIONS': settings.DATABASES['default'].get('OPTIONS', {}),
            'CONN_HEALTH_CHECKS': settings.DATABASES['default'].get('CONN_HEALTH_CHECKS', False),
            'CONN_MAX_AGE': settings.DATABASES['default'].get('CONN_MAX_AGE', 0),
            'AUTOCOMMIT': settings.DATABASES['default'].get('AUTOCOMMIT', True),
            'ATOMIC_REQUESTS': settings.DATABASES['default'].get('ATOMIC_REQUESTS', False),
        }

        try:
            # Fetch all products from the specific user's database
            products = Product.objects.using(user_db_name).all()
            serializer = ProductSerializer(products, many=True)
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
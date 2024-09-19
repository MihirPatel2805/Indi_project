from django.shortcuts import render
from rest_framework import viewsets
from .models import Product, OrderList ,Parties,PurchaseList
from .serializers import ProductSerializer, OrderSerializer ,PartiesSerializer,PurchaseSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import F
import pymongo
from django.conf import settings
from django.shortcuts import get_object_or_404

from bson import ObjectId

class ProductView(APIView):
    def post(self, request):
        print(request.data)
        print(request.FILES)
        print(request.data.get('design_no'))
        serializer = ProductSerializer(data={'design_no': request.data.get('design_no'),'total_set':0,'color': request.data.get('color'), 'price': int(request.data.get('price')),
                                             'image': request.FILES.get('image')})
        # print(settings.DATABASES)
        # print(serializer.data)
        print(serializer.is_valid())
        if serializer.is_valid():
            user_email = request.data.get('email')  # Or however you identify the user
            user_db_name = user_email.replace('@', '_').replace('.', '_') + '_db'  # Convert email to db name

            database_settings(user_db_name)

            try:
            # Instead of serializer.save(), we manually create an instance and save it to the specific database
                product_instance = Product(**serializer.validated_data)
                print(product_instance)
                print(serializer)
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
        database_settings(user_db_name)

        try:
            # Fetch all products from the specific user's database
            products = Product.objects.using(user_db_name).all()
            serializer = ProductSerializer(products, many=True)
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SearchItems(APIView):
    def post(self,request):
        print(request.data)
        user_email = request.data.get('email')
        design_no=request.data.get('design_no')
        if not user_email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Convert the email to a database name format
        user_db_name = user_email.replace('@', '_').replace('.', '_') + '_db'

        # Construct a new database configuration using settings
        database_settings(user_db_name)

        if not design_no:
            data=Product.objects.using(user_db_name).all()
        else:
            data=Product.objects.using(user_db_name).filter(design_no__startswith=design_no)
        print(data)
        serializer = ProductSerializer(data,many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AddParties(APIView):
    def post(self,request):
        serializer = PartiesSerializer(data={'party_name': request.data.get('party_name'),
                                             'mobile':request.data.get('mobile'),
                                             'gst_number': request.data.get('gst_number'),
                                             'address': request.data.get('address'),
                                             })
        # print(settings.DATABASES)
        # print(serializer.data)
        print(serializer.is_valid())
        if serializer.is_valid():
            user_email = request.data.get('email')  # Or however you identify the user
            user_db_name = user_email.replace('@', '_').replace('.', '_') + '_db'  # Convert email to db name

            database_settings(user_db_name)

            try:
                # Instead of serializer.save(), we manually create an instance and save it to the specific database
                product_instance = Parties(**serializer.validated_data)
                product_instance.save(using=user_db_name)  # Save to the specific user's database
                return Response('Party Added..', status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddStock(APIView):
    def post(self,request):
            user_email = request.data.get('email')  # Or however you identify the user
            user_db_name = user_email.replace('@', '_').replace('.', '_') + '_db'  # Convert email to db name

            database_settings(user_db_name)
            try:
                product = Product.objects.using(user_db_name).filter(design_no=request.data.get('design_no'))
                serializer = ProductSerializer(product, many=True)
                print(serializer.data)
                # Calculate the new total_pieces value
                total_set = int(request.data.get('total_set', 0))
                serializer.data[0]['total_set'] += total_set  # Add the new total set to the existing total_pieces

                Product.objects.using(user_db_name).filter(design_no=request.data.get('design_no')).update(total_set=serializer.data[0]['total_set'])
                return Response(serializer.data, status=status.HTTP_200_OK )
            except Exception as e:
                return Response({'error': 'Design No. not exist'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ViewParties(APIView):
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
        database_settings(user_db_name)

        try:
            data = Parties.objects.using(user_db_name).all()
            print(data)
            serializer = PartiesSerializer(data, many=True)
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AddOrderListView(APIView):
    def post(self, request):
        serializer = OrderSerializer(data={'party_name': request.data.get('partyName'),
                                             'party_details': request.data.get('partyDetails'),
                                             'date': request.data.get('date'),
                                             'orderList': request.data.get('orderList'),
                                            'total_price': request.data.get('total_price'),
                                             })
        # print(settings.DATABASES)
        # print(serializer.data)
        # print(serializer.is_valid())
        if serializer.is_valid():
            user_email = request.data.get('email')  # Or however you identify the user
            user_db_name = user_email.replace('@', '_').replace('.', '_') + '_db'  # Convert email to db name

            database_settings(user_db_name)

            try:
                # Instead of serializer.save(), we manually create an instance and save it to the specific database
                order_instance = OrderList(**serializer.validated_data)
                print(serializer)
                print(order_instance)
                order_instance.save(using=user_db_name)  # Save to the specific user's database

                return removeOrderListItemsFromStock(request.data.get('orderList'), user_db_name)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetOrderView(APIView):
    def get(self, request):
        user_email = request.query_params.get('email')  # Get user email from query parameters
        if not user_email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Convert the email to a database name format
        user_db_name = user_email.replace('@', '_').replace('.', '_') + '_db'

        # Construct a new database configuration using settings
        database_settings(user_db_name)

        try:
            data = OrderList.objects.using(user_db_name).all()
            print(data)

            serializer = OrderSerializer(data, many=True)
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AddPurchaseListView(APIView):
    def post(self, request):
        serializer =PurchaseSerializer(data={'party_name': request.data.get('partyName'),
                                           'party_details': request.data.get('partyDetails'),
                                           'date': request.data.get('date'),
                                           'purchaseList': request.data.get('purchaseList'),
                                           'total_price': request.data.get('total_price'),
                                           })
        # print(settings.DATABASES)
        # print(serializer.data)
        # print(serializer.is_valid())
        if serializer.is_valid():
            user_email = request.data.get('email')  # Or however you identify the user
            user_db_name = user_email.replace('@', '_').replace('.', '_') + '_db'  # Convert email to db name

            database_settings(user_db_name)

            try:
                # Instead of serializer.save(), we manually create an instance and save it to the specific database
                purchase_instance = PurchaseList(**serializer.validated_data)
                purchase_instance.save(using=user_db_name)  # Save to the specific user's database

                return Response('Purchase updated..', status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetPurchaseView(APIView):
    def get(self, request):
        user_email = request.query_params.get('email')  # Get user email from query parameters
        if not user_email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Convert the email to a database name format
        user_db_name = user_email.replace('@', '_').replace('.', '_') + '_db'

        # Construct a new database configuration using settings
        database_settings(user_db_name)

        try:
            data = PurchaseList.objects.using(user_db_name).all()
            print(data)

            serializer = PurchaseSerializer(data, many=True)
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class GetOrderDetailView(APIView):
   def get(self, request,pk):
        user_email = request.query_params.get('email')
        print(user_email)
        user_db_name = user_email.replace('@', '_').replace('.', '_') + '_db'
        # Construct a new database configuration using settings
        database_settings(user_db_name)
        order = OrderList.objects.using(user_db_name).filter(_id=ObjectId(pk))
        print(order)
        serializer = OrderSerializer(order, many=True)
        return Response(serializer.data , status=status.HTTP_200_OK)


class GetPurchaseDetailView(APIView):
    def get(self, request, pk):
        user_email = request.query_params.get('email')
        print(user_email)
        user_db_name = user_email.replace('@', '_').replace('.', '_') + '_db'
        # Construct a new database configuration using settings
        database_settings(user_db_name)
        order = PurchaseList.objects.using(user_db_name).filter(_id=ObjectId(pk))
        print(order)
        serializer = PurchaseSerializer(order, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
def database_settings(user_db_name):
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


def removeOrderListItemsFromStock(orderList,user_db_name):
    for item in orderList:
        try:
            print(item)
            print(item['designNo'])
            product = Product.objects.using(user_db_name).filter(design_no=item['designNo'])
            print(product)
            serializer = ProductSerializer(product, many=True)
            print(serializer.data)
            # Calculate the new total_pieces value
            total_set = int(item['quantity'])
            print(total_set)
            serializer.data[0]['total_set'] -= total_set  # Add the new total set to the existing total_pieces

            Product.objects.using(user_db_name).filter(design_no=item['designNo']).update(total_set=serializer.data[0]['total_set'])

        except Exception :
            return Response({'error': 'Design No. not exist'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response('item updated..', status=status.HTTP_200_OK)
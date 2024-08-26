from django.shortcuts import render
from rest_framework import viewsets
from .models import Product, Order
from .serializers import ProductSerializer, OrderSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
class ProductView(APIView):
    def post(self, request):
        print(request.data)
        serializer = ProductSerializer(data={'design_no': request.data['design_no'],'total_pieces':0,'pieces_set':{'M': 0, 'L': 0, 'XL': 0, 'XXL': 0},'color': request.data['color'], 'price': int(request.data['price']),
                                             'image': request.data['image']})

        if serializer.is_valid():
            user_email = request.data['email']  # Or however you identify the user
            user_db_name = user_email.replace('@', '_').replace('.', '_') + '_db'  # Convert email to db name

            # Use 'using()' to save to the specific user's database
            try:
                # Instead of serializer.save(), we manually create an instance and save it to the specific database
                product_instance = Product(**serializer.validated_data)
                product_instance.save(using=user_db_name)  # Save to the specific user's database

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from .models import User
import jwt,datetime
from django.http import HttpResponse
from clothing_inventory import settings

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')

        payload ={
            'id':user.id,
            'exp': datetime.datetime.utcnow()+ datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow(),
        }
        token = jwt.encode(payload,settings.SECRET_KEY, algorithm='HS256')

        response=Response()
        # response = HttpResponse('blah')
        print(token)
        response.set_cookie('jwt', token,httponly=True, samesite='None', secure=True)
        response.data = {
            "token": token,
        }
        print(response.data)
        return response



class UserView(APIView):

    def get(self, request):
        # print(request.headers)
        # print(request.COOKIES)
        token =request.COOKIES.get('jwt')
        # print(token)
        if not token:
            raise AuthenticationFailed('Token not found')

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token not valid')
        # print(payload)
        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        # print(serializer.data)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')

        response.data={
            'massage': 'Logout successful'
        }
        return response


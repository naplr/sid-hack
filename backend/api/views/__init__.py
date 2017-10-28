from django.http import JsonResponse, HttpResponseBadRequest, HttpResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from sklearn.externals import joblib
import json
import pandas as pd

from api.models import User


# class UserViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows users to be viewed or edited.
#     """
#     queryset = User.objects.all().order_by('-date_joined')
#     serializer_class = UserSerializer



# class PredictViewSet(viewsets.ViewSet):
#     def create(self, request):
#         data = request.data['features']
#         clf = joblib.load('./tutorial/model.pkl') 

#         result = clf.predict(data)

#         return Response({'result': result})


class TestViewSet(viewsets.ViewSet):
    def list(self, request):
        return Response({'test': 'yo'})


@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode("utf-8"))

        if data is None:
            return HttpResponseBadRequest('Invalid JSON')

        print(data)

        email = data['email'] 
        fbid = data['userID']
        name = data['name']
        token = data['accessToken']
        picture = data['picture']['data']['url']

        user, created = User.objects.get_or_create(fbid=fbid)

        user.email=email,
        user.name=name,
        user.token=token,
        user.picture=picture

        user.save()

        return JsonResponse({
            'id': user.id,
            'email': email,
            'fbid': fbid,
            'name': name,
            'token': token,
            'picture': picture,
            'created': created
        })

        # Do something
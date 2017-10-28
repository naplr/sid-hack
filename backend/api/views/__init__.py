from django.contrib.auth.models import User, Group
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets
from rest_framework.response import Response
from sklearn.externals import joblib
import json
import pandas as pd


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


def login(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode("utf-8"))

        if data is None:
            return HttpResponseBadRequest('Invalid JSON')

        email = data['email'] 
        fbid = data['id']

        # Do something
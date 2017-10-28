from django.contrib.auth.models import User, Group
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets, permissions, serializers
from rest_framework.response import Response
from api.models import Page, Post


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ('__all__')


class PageViewSet(viewsets.ModelViewSet):
    serializer_class = PageSerializer
    queryset = Page.objects.all()

from django.contrib.auth.models import User, Group
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets, permissions, serializers
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from api.models import Page, Post, CampaignedPage

import facebook
import json


class PageSerializer(serializers.ModelSerializer):
    # campaigns = serializers.SerializerMethodField()
    class Meta:
        model = Page
        fields = ('__all__')

    # def get_campaigns(self, obj):
    #   return [c.id for c in obj.campaigns.all()]


class PageViewSet(viewsets.ModelViewSet):
    serializer_class = PageSerializer
    queryset = Page.objects.all()

    @detail_route(methods=['get'])
    def campaigns(self, request, pk=None):
        userid = self.request.query_params.get('userId', None)

        page = self.get_object()
        campaigns = page.campaigns.exclude(status=CampaignedPage.DELETED)

        # for c in campaigns:
        #     print(c.campaign.name)
        #     print(c.campaign.id)
        #     print(c.campaign.user.id)

        return Response([c.campaign.id for c in campaigns if str(c.campaign.user.id) == userid])

class ActionClaimPage(viewsets.ViewSet):
    def create(self, request):
        pageId = request.data['pageId']
        pageAccessToken = request.data['access_token']
        graph = facebook.GraphAPI(pageAccessToken, version='2.10')
        page_fans_gender_age_json = graph.get_object('/{}/insights/page_fans_gender_age'.format(pageId))['data'][0]['values'][-1]['value']
        page_fans_gender_age = json.dumps(page_fans_gender_age_json)
        page_fan_adds_unique = graph.get_object('/{}/insights/page_fan_adds_unique?period=week'.format(pageId))['data'][0]['values'][-1]['value']
        page = Page.objects.get(page_id=pageId)
        page.claim_status = True
        page.page_fan_adds_unique = page_fan_adds_unique
        page.page_fans_gender_age = page_fans_gender_age
        page.save()

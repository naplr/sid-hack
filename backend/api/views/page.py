from django.contrib.auth.models import User, Group
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets, permissions, serializers
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from api.models import Page, Post, CampaignedPage


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

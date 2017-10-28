from django.db import IntegrityError
from django.contrib.auth.models import User, Group
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets, permissions, serializers
from rest_framework.decorators import detail_route
from rest_framework.response import Response

from api.models import Campaign, CampaignedPage
from .page import PageSerializer

class CampaignedPageSerializer(serializers.ModelSerializer):
    page = PageSerializer()

    class Meta:
        model = CampaignedPage
        fields = ('__all__')


class CampaignSerializer(serializers.ModelSerializer):
    # pages = serializers.SerializerMethodField()
    class Meta:
        model = Campaign
        fields = ('__all__')

    # def get_pages(self, obj):
    #     serializers = CampaignedPageSerializer(
    #         obj.pages,
    #         many=True, 
    #     )

    #     return serializers.data


class ActionAddPageToCampaign(viewsets.ViewSet):
    def create(self, request):
        try:
            pageid = request.data['pageId']
            campaignid = request.data['campaignId']
            cp, created = CampaignedPage.objects.get_or_create(page_id=pageid, campaign_id=campaignid)

            if cp.status == CampaignedPage.DELETED:
                cp.status = CampaignedPage.POTENTIAL
                cp.save()

            return Response({
                'id': str(cp.id),
                'created': created
            })
        except IntegrityError:
            # TODO: Proper log.
            return Response({
                'message': "Page {} or Campaign {} does not exist.".format(pageid, campaignid)
            })


class ActionRemovePageFromCampaign(viewsets.ViewSet):
    def create(self, request):
        try:
            pageid = request.data['pageId']
            campaignid = request.data['campaignId']

            cp = CampaignedPage.objects.get(page_id=pageid, campaign_id=campaignid)
            cp.status = CampaignedPage.DELETED
            cp.save()

            return Response({
                'id': str(cp.id),
            })
        except CampaignedPage.DoesNotExist:
            # TODO: Proper log.
            return Response({
                'message': "Page {} is not associated with Campaign {}.".format(pageid, campaignid)
            })


class ActionUpdateCampaignedPageStatus(viewsets.ViewSet):
    def create(self, request):
        try:
            pageid = request.data['pageId']
            campaignid = request.data['campaignId']
            status = request.data['status']

            cp = CampaignedPage.objects.get(page_id=pageid, campaign_id=campaignid)

            if status == 'potential':
                cp.status = CampaignedPage.POTENTIAL
            elif status == 'interested':
                cp.status = CampaignedPage.INTERESTED
            elif status == 'engaged':
                cp.status = CampaignedPage.ENGAGED
            elif status == 'paid':
                cp.status = CampaignedPage.PAID
            elif status == 'deleted':
                cp.status = CampaignedPage.DELETED

            cp.save()

            return Response({
                'id': str(cp.id),
            })
        except CampaignedPage.DoesNotExist:
            # TODO: Proper log.
            return Response({
                'message': "Page {} is not associated with Campaign {}.".format(pageid, campaignid)
            })

class CampaignViewSet(viewsets.ModelViewSet):
    serializer_class = CampaignSerializer

    def get_queryset(self):
        queryset = Campaign.objects.all()
        userid = self.request.query_params.get('userid', None)
        if userid is not None:
            queryset = queryset.filter(user=userid)
        return queryset

    @detail_route(methods=['get'])
    def pages(self, request, pk=None):
        campaign = self.get_object()
        pages = campaign.pages.exclude(status=CampaignedPage.DELETED)

        serializers = CampaignedPageSerializer(
            pages,
            many=True, 
            context={ 'request': request }
        )

        return Response(serializers.data)

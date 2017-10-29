from django.contrib.auth.models import User, Group
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets, permissions, serializers
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from api.models import Page, Post, CampaignedPage

from sklearn.externals import joblib
from .page import PageSerializer

class RecommendationModel(viewsets.ViewSet):
    def create(self, request):
        pageIds = request.data['pageIds']
        corr_mat = joblib.load('./scripts/recommendation_model_bycomment.pk')
        page_ids = joblib.load('./scripts/page_ids_bycomment.pk')
        print(list(page_ids))
        page_id_recommended_final = []
        pages_list = list(page_ids)
        for page_id in pageIds:
            print(pages_list.index(page_id))
            corr_mat_selected = corr_mat[pages_list.index(page_id)]
            for page_id_recommended in list(page_ids[(corr_mat_selected<0.99) & (corr_mat_selected>0.6)]):
                page_id_recommended_final.append(page_id_recommended)

        # print(list(set(page_id_recommended_final)))
        recommended = list(set(page_id_recommended_final))
        pages = Page.objects.filter(page_id__in=recommended)
        serializers = PageSerializer(
          pages,
          many=True
        )

        return Response(serializers.data)
        # return Response({"pageIds": list(set(page_id_recommended_final))})

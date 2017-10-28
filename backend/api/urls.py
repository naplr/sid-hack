from django.conf.urls import url, include
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter

from . import views
from .views import campaign, page

uuid_regex = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
router = DefaultRouter()

router.register(r'test', views.TestViewSet, base_name='test')
router.register(r'campaigns', campaign.CampaignViewSet, base_name='campaign')
router.register(r'pages', page.PageViewSet, base_name='page')

router.register(r'action/add-page-to-campaign', campaign.ActionAddPageToCampaign, base_name='aptc')
router.register(r'action/remove-page-from-campaign', campaign.ActionRemovePageFromCampaign, base_name='rptc')
router.register(r'action/update-campaigned-page-status', campaign.ActionUpdateCampaignedPageStatus, base_name='ucps')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^login/', views.login)
]

from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=64, null=True)


class Campaign(models.Model):
    name = models.CharField(max_length=256, null=True)


class Page(models.Model):
    name = models.CharField(max_length=256, null=True)
    fbid = models.CharField(max_length=128, null=True)


class CampaignedPage(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    page = models.ForeignKey(Page, on_delete=models.CASCADE)
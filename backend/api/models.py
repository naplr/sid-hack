from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=64, null=True)


class Campaign(models.Model):
    name = models.CharField(max_length=256, null=True)
    is_active = models.BooleanField(default=True)


class Page(models.Model):
    name = models.CharField(max_length=256, null=True)
    fbid = models.CharField(max_length=128, null=True)


class CampaignedPage(models.Model):
    POTENTIAL = 0
    INTERESTED = 1
    ENGAGED = 2
    PAID = 4
    DELETED = 8
    STATUS = (
        (POTENTIAL, 'Potential'),
        (INTERESTED, 'Interested'),
        (ENGAGED, 'Engaged'),
        (PAID, 'Paid'),
        (DELETED, 'Deleted')
    )

    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    page = models.ForeignKey(Page, on_delete=models.CASCADE)

    status = models.IntegerField(choices=STATUS, default=0)
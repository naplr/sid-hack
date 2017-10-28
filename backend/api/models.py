from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=64, null=True)

    def __str__(self):
        return self.name


class Campaign(models.Model):
    name = models.CharField(max_length=256, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='campaigns')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return '{} - {}'.format(self.name, self.user.name)


class Page(models.Model):
    name = models.CharField(max_length=256, null=True)
    fbid = models.CharField(max_length=128, null=True)


class Post(models.Model):
    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name='posts')
    message = models.TextField(null=True)
    like_count = models.PositiveIntegerField()
    comment_count = models.PositiveIntegerField()
    reaction_count = models.PositiveIntegerField()


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

    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='pages')
    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name='campaigns')

    status = models.IntegerField(choices=STATUS, default=0)
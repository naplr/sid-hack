from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=128, null=True)
    picture = models.CharField(max_length=1024, null=True, blank=True)
    token = models.CharField(max_length=256, null=True, blank=True)
    email = models.CharField(max_length=128, null=True, blank=True)
    fbid = models.CharField(max_length=128, null=True, blank=True)

    def __str__(self):
        return self.name


class Campaign(models.Model):
    name = models.CharField(max_length=256, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='campaigns')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return '{} - {}'.format(self.name, self.user.name)


class Page(models.Model):
    page_id = models.CharField(max_length=256, null=True)
    page_name = models.CharField(max_length=256, null=True)
    page_title = models.CharField(max_length=256, null=True)
    page_profile = models.CharField(max_length=512, null=True)
    page_cover = models.CharField(max_length=512, null=True)
    page_category = models.CharField(max_length=256, null=True)
    page_reactions_avg = models.IntegerField(null=True)
    page_reactions_sd = models.IntegerField(null=True)
    page_reactions_max = models.IntegerField(null=True)
    page_reactions_min = models.IntegerField(null=True)
    page_comments_avg = models.IntegerField(null=True)
    page_comments_sd = models.IntegerField(null=True)
    page_comments_max = models.IntegerField(null=True)
    page_comments_min = models.IntegerField(null=True)
    page_shares_avg = models.IntegerField(null=True)
    page_shares_sd = models.IntegerField(null=True)
    page_shares_max = models.IntegerField(null=True)
    page_shares_min = models.IntegerField(null=True)
    page_reactions_max_post_id = models.CharField(max_length=128, null=True)
    page_comments_max_post_id = models.CharField(max_length=128, null=True)
    page_shares_max_post_id = models.CharField(max_length=128, null=True)
    page_post_count = models.IntegerField(null=True)
    claim_status = models.BooleanField(default=False)
    page_fans_gender_age = models.TextField(null=True)
    page_fan_adds_unique = models.IntegerField(null=True)

    def __str__(self):
        return '{} - {}'.format(self.page_name, self.page_id)


class Post(models.Model):
    post_id = models.CharField(max_length=256, null=True)
    page_id = models.ForeignKey(Page, on_delete=models.CASCADE, related_name='posts')
    created_time = models.DateField(null=True)
    share_count = models.PositiveIntegerField(null=True)
    comment_count = models.PositiveIntegerField(null=True)
    reaction_count = models.PositiveIntegerField(null=True)


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

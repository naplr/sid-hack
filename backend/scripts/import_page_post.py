import os, sys, csv

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.append(BASE_DIR)
import django

django.setup()

from api.models import Page, Post
import pandas as pd

if __name__ == '__main__':
    db_page = pd.read_csv('./../../data/summary.csv')
    print(db_page['page_id'])
    for i in db_page.index:
        page, created = Page.objects.get_or_create(page_id=db_page.loc[i, 'page_id'],
                                                    page_name=db_page.loc[i, 'page_name'],
                                                    page_title=db_page.loc[i, 'page_title'],
                                                    page_profile=db_page.loc[i, 'page_profile'],
                                                    page_cover=db_page.loc[i, 'page_cover'],
                                                    page_category=db_page.loc[i, 'page_category'],
                                                    page_reactions_avg=db_page.loc[i, 'page_reactions_avg'],
                                                    page_reactions_sd=db_page.loc[i, 'page_reactions_sd'],
                                                    page_reactions_max=db_page.loc[i, 'page_reactions_max'],
                                                    page_reactions_min=db_page.loc[i, 'page_reactions_min'],
                                                    page_comments_avg=db_page.loc[i, 'page_comments_avg'],
                                                    page_comments_sd=db_page.loc[i, 'page_comments_sd'],
                                                    page_comments_min=db_page.loc[i, 'page_comments_min'],
                                                    page_comments_max=db_page.loc[i, 'page_comments_max'],
                                                    page_shares_avg=db_page.loc[i, 'page_shares_avg'],
                                                    page_shares_sd=db_page.loc[i, 'page_shares_sd'],
                                                    page_shares_min=db_page.loc[i, 'page_shares_min'],
                                                    page_shares_max=db_page.loc[i, 'page_shares_max'],
                                                    page_reactions_max_post_id=db_page.loc[i, 'page_reactions_max_post_id'],
                                                    page_comments_max_post_id=db_page.loc[i, 'page_comments_max_post_id'],
                                                    page_shares_max_post_id=db_page.loc[i, 'page_shares_max_post_id'],
                                                    page_post_count=db_page.loc[i, 'page_post_count'])


    page_names = ['bangkokeatbig', 'bornmadeak', 'DakNaeNon', 'dinewithpigs', 'paidonnnn', 'snapbeforeeatofficial', 'ipedinth', 'AroiTongShare']
    for page_name in page_names:
        temp_db = pd.read_csv('./../../data/summary2/'+page_name+'.csv')
        print(temp_db['page_id'][0])
        for i in temp_db.index:
            page_id = temp_db.loc[i, 'page_id']
            page = Page.objects.get(page_id=page_id)
            post, created = Post.objects.get_or_create(post_id=temp_db.loc[i, 'post_id'],
                                                        page_id=page,
                                                        created_time=temp_db.loc[i, 'created_time'],
                                                        reaction_count=temp_db.loc[i, 'num_reactions'],
                                                        comment_count=temp_db.loc[i, 'num_comments'],
                                                        share_count=temp_db.loc[i, 'num_shares'])

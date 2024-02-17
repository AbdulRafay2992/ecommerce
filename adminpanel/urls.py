# from rest_framework import routers
# from .api import CategoryViewSet
from django.urls import path, re_path
from . import views
from graphene_django.views import GraphQLView
from .schema import schema
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('/',views.index),
    #django paths
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True, schema=schema))),
    
    
    path('getattributes/',views.get_attributes),
    
    path('attributes/addattribute/',views.create_attribute),
    path('attributes/addattributevalue/',views.create_attribute_value),

    path('attributes/deleteattribute/',views.delete_attribute),
    path('attributes/deleteattributevalue/',views.delete_attribute_value),

    path('getcategories/',views.get_categories),
    path('categories/addcategory/',views.create_category),

    path('getproducts/',views.get_products),
    path('addnewproduct/',views.create_product),

    #react paths
    re_path(r'^.*/$', views.index),
]
from django.urls import path
from app.API.Read import GetFields,GetNameandPK
urlpatterns = [
    path("fields/<str:module>",GetFields,name="getfields"),
    path("searchname/<str:module>/<str:search>/",GetNameandPK,name="getname")
]

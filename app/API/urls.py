from django.urls import path
from app.API.Read import GetFields,GetNameandPK
urlpatterns = [
    path("fields/<str:model>",GetFields,name="getfields"),
    path("searchname/<str:model>/<str:search>/",GetNameandPK,name="getname")
]

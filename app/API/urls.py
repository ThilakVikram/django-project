from django.urls import path
from app.API.Read import GetFields,GetNameandPK
from app.API.Create import CreateTemplate
urlpatterns = [
    path("fields/<str:model>",GetFields,name="getfields"),
    path("searchname/<str:model>/<str:search>/",GetNameandPK,name="getname"),
    path("create/<str:model>/",CreateTemplate,name="CreateRecord")
]

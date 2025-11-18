from django.http import JsonResponse
from app import models
from django.db.models import Q

def GetFields(req,model):
    structure = getattr(models,model)().getStructure()
    return JsonResponse(structure,safe=False)

def GetNameandPK(req,model,search):
    data = list(getattr(models,model).objects.filter(Q(name__istartswith=search.lower())|Q(id__istartswith=search)).values("id","name").order_by("name"))
    return JsonResponse(data[:5],safe=False)
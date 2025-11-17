from django.http import JsonResponse
from app import models

def GetFields(req,module):
    structure = getattr(models,module.capitalize())().getStructure()
    return JsonResponse(structure,safe=False)

def GetNameandPK(req,module,search):
    data = list(models.Member.objects.filter(name__istartswith=search.lower()).values("id","name").order_by("name"))
    return JsonResponse(data[:3],safe=False)
from django.shortcuts import render,redirect
from app.modelsForm import *

def Add_Member(req):
    FORM = Memberform
    MODEL = FORM.Meta.model
    htmlname = "Add_Member"
    if(req.method == "POST"):
        form = MODEL(req.POST)
        if(form.is_valid()):
            form.save()
            return redirect("success")
        else:
            return redirect("error")
    return render(req,f"page/{htmlname}.html",{"form":FORM})

def Add_Membership(req):
    FORM = Membershipform
    MODEL = FORM.Meta.model
    htmlname = "Add_Membership"
    if(req.method == "POST"):
        form = MODEL(req.POST)
        if(form.is_valid()):
            form.save()
            return redirect("success")
        else:
            return redirect("error")
    return render(req,f"page/{htmlname}.html",{"form":FORM})

def Add_Purchase(req):
    FORM = Purchaseform
    MODEL = FORM.Meta.model
    htmlname = "Add_Purchase"
    if(req.method == "POST"):
        form = MODEL(req.POST)
        if(form.is_valid()):
            form.save()
            return redirect("success")
        else:
            return redirect("error")
    return render(req,f"page/{htmlname}.html",{"form":FORM})

def Add_Payment(req):
    FORM = Paymentform
    MODEL = FORM.Meta.model
    htmlname = "Add_Payment"
    if(req.method == "POST"):
        form = MODEL(req.POST)
        if(form.is_valid()):
            form.save()
            return redirect("success")
        else:
            return redirect("error")
    return render(req,f"page/{htmlname}.html",{"form":FORM})

def Add_Fitness(req):
    FORM = Fitnessform
    MODEL = FORM.Meta.model
    htmlname = "Add_Fitness"
    if(req.method == "POST"):
        form = MODEL(req.POST)
        if(form.is_valid()):
            form.save()
            return redirect("success")
        else:
            return redirect("error")
    return render(req,f"page/{htmlname}.html",{"form":FORM})
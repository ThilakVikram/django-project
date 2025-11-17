from django.shortcuts import render,redirect

def Home(req):
    return render(req,"Home/index.html")
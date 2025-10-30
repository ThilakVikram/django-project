from django import forms
from app.models import *

class Memberform(forms.ModelForm):
    class Meta:
        model = Member
        fields = "__all__"
        
        
class Membershipform(forms.ModelForm):
    class Meta:
        model = Membership
        fields = "__all__"
        
class Fitnessform(forms.ModelForm):
    class Meta:
        model = Fitness
        fields = "__all__"

class Purchaseform(forms.ModelForm):
    class Meta:
        model = Purchase
        fields = "__all__"

class Paymentform(forms.ModelForm):
    class Meta:
        model = Payment
        fields = "__all__"
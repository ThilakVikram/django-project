from django.db import models

# Create your models here.
class Member(models.Model):
    class Meta:
        db_table = "Member"
    id = models.BigAutoField(primary_key=True)
    name = models.TextField(null=False)
    contactno = models.TextField(max_length=14)
    email = models.TextField(max_length=25)
    address = models.TextField()
    area = models.TextField(max_length=30)
    joineddate = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.memberid
    def getStructure(self):
        return {
            "name":{
                "type":"text",
                "name":"Member ID"
                },
            "contactno":{
                "type":"text",
                "name":"Contact Number"
                },
            "email":{
                "type":"text",
                "name":"Email Address"
                },
            "address":{
                "type":"multiline",
                "name":"Address"
                },
            "area":{
                "type":"text",
                "name":"Member ID"
                },
            "joineddate":{
                "type":"date",
                "name":"Joined Date"
                }
        }
    
class Membership(models.Model):
    class MemberShipPeriod(models.IntegerChoices):
        ONE = 1
        THREE = 3
        SIX = 6
        NINE = 9
        TWELVE = 12
    class Meta:
        db_table = "Membership"
    id = models.BigAutoField(primary_key=True)
    name = models.TextField()
    periodinmonth = models.IntegerField(choices=MemberShipPeriod.choices,default=MemberShipPeriod.ONE)
    amountininr = models.IntegerField(null=False)
    createddate = models.DateTimeField(null=False)
    
    def getStructure(self):
        return {
            "name":{
                "type":"text",
                "name":"Membership Name"
                },
            "periodinmonth":{
                "type":"choice",
                "name":"Period In Month",
                "choice":[
                    {"value":"1","name":"One Month"},
                    {"value":"3","name":"Three Month"},
                    {"value":"6","name":"Six Month"},
                    {"value":"9","name":"Nine Month"},
                    {"value":"12","name":"Twelve Month - (Year)"},
                ]
                },
            "amountininr":{
                "type":"number",
                "name":"Amount"
                },
            "createddate":{
                "type":"date",
                "name":"Created Date"
                }
        }
    
class Purchase(models.Model):
    class Meta:
        db_table = "Purchase"
    id = models.BigAutoField(primary_key=True)
    memberid = models.ForeignKey(to=Member,on_delete=models.CASCADE)
    membershipid = models.ForeignKey(to=Membership,on_delete=models.CASCADE)
    amount = models.IntegerField(null=False)
    date = models.DateTimeField(auto_now_add=True)
    
    def getStructure(self,memberid = None,membershipid = None):
        return {
            "purchaseid":{
                "type":"",
                "name":""
                },
            "memberid":{
                "type":"",
                "name":""
                },
            "membershipid":{
                "type":"",
                "name":""
                },
            "amount":{
                "type":"",
                "name":""
                },
            "date":{
                "type":"",
                "name":""
                }
        }
    
class Payment(models.Model):
    class Meta:
        db_table = "Payment"
    id = models.BigAutoField(primary_key=True)
    purchaseid = models.ForeignKey(Purchase,on_delete=models.CASCADE)
    amount = models.IntegerField(null=False,blank=False,default=0)
    date = models.DateTimeField(auto_now_add=True)
    
    def getStructure(self):
        return {
            "paymentid":"id",
            "purchaseid":"id",
            "amount":"currency",
            "date":"date"
        }
    
class Fitness(models.Model):
    class Meta:
        db_table = "Fitness"
    id = models.BigAutoField(primary_key=True)
    memberid = models.ForeignKey(Member,on_delete=models.CASCADE)
    height = models.IntegerField(default=0)
    weight = models.IntegerField(default=0)
    bmi = models.IntegerField(default=0)
    date = models.DateTimeField(auto_now_add=True)
    
    def getStructure(self):
        return {
            "fitnessid":"id",
            "memberid":"id",
            "height":"int",
            "weight":"int",
            "bmi":"int",
            "date":"date"
        }
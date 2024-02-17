from django.http import JsonResponse
from .models import Category, Product, Attribute, AttributeValue, ProductVariation
from django.shortcuts import redirect,render
import datetime,json
from django.http import HttpResponse

SUCCESSFULL=1
FAILED=0

def index(request):
    return render(request,'index.html')

def create_category(request):
    
    if request.method == 'POST':  
        data = json.loads(request.body.decode('utf-8'))
        name = data.get('name')
        parent_category = data.get('parent_category')
        try:
            Category.objects.create(name=name, parent_category=parent_category)
            categories = list(Category.objects.all().values())
            return JsonResponse({'res':SUCCESSFULL,"payload":categories},content_type='application/json',safe=False)
        except Exception as e:
            return HttpResponse(str(e))
    
def create_product(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        category = request.POST.get('category')
        description = request.POST.get('description')
        try:
            result=Category.objects.get(name=category) #Category.DoesNotExist if category doesnt exist
            product = list(Product.objects.create(name=name, category=result.id, description=description))
            return JsonResponse(product, status=201)
        except Exception as e:
            logWrite(str(e))
            redirect("http://mycodes.rf.gd/hi")

def create_attribute(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            name = data.get('name')
            if name:
                Attribute.objects.create(name=name)
                attributes = get_attributes(request)
                return attributes
            else:
                return HttpResponse('Missing or empty "attribute" field', status=400)
        except Exception as e:
            return HttpResponse(str(e), status=500)

def create_attribute_value(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            id = data.get('id')
            value=data.get('value')
            AttributeValue.objects.create(attribute_id=id,value=value)
            attribute_values = list(AttributeValue.objects.filter(attribute=id).values())
            return JsonResponse({'res':SUCCESSFULL,"payload":attribute_values},content_type='application/json',safe=False)
        except Exception as e:
            return HttpResponse(str(e))

def delete_attribute(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            id = data.get('id')
            if id:
                Attribute.objects.get(id=id).delete() 
                attributes = list(Attribute.objects.all().values())
                return JsonResponse({'res':SUCCESSFULL,"payload":attributes}, safe=False)
            else:
                return HttpResponse('failed to delete', status=400)
        except Exception as e:
            return HttpResponse(str(e), status=500)
        
def delete_attribute_value(request):
    
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            id = data.get('id')
            attribute_id=data.get('attribute')
            if id:
                AttributeValue.objects.get(id=id).delete()
                attributes = list(AttributeValue.objects.filter(attribute=attribute_id).values())
                return JsonResponse({'res':SUCCESSFULL,"payload":attributes}, safe=False)
            else:
                return HttpResponse('failed to delete', status=400)
        except Exception as e:
            return HttpResponse(str(e), status=500)

def add_product_attribute(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        attribute = ProductVariation.objects.create(name=name)
        serializer = AttributeSerializer(attribute)
        return JsonResponse(serializer.data, status=201)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

def get_attributes(request):
    attribute_Table = list(Attribute.objects.values())
    returned_data=[]
    for attribute_row in attribute_Table:
        attribute={}
        attribute["id"]=attribute_row["id"]
        attribute["name"]=attribute_row["name"]
        
        attribute_values = list(AttributeValue.objects.filter(attribute=int(attribute_row['id'])).values())

        attribute["values"]=[]
        for value in attribute_values:
            attr={}
            attr["id"]=value['id']
            attr["value"]=value['value']
            attribute["values"].append(attr)
        returned_data.append(attribute)
    return JsonResponse({'res':SUCCESSFULL,"payload":returned_data},content_type='application/json',safe=False)

def get_categories(request):
    categories = list(Category.objects.all().values())
    return JsonResponse({'res':SUCCESSFULL,"payload":categories},content_type='application/json',safe=False)

def get_products(request):
    products = list(Product.objects.all().values())
    return JsonResponse({'res':SUCCESSFULL,"payload":products},content_type='application/json',safe=False)

def logWrite(txt):
	with open('logs/ExceptionLogs.txt','a+') as f:
		f.write(datetime.datetime.now()+"\n"+txt+"-----------------------------------------")
	f.close()
        
def p(t,d):
    print('-----------'+t+'----------------')
    print('-----------'+str(d)+'-----------')
    print('--------------------------------')
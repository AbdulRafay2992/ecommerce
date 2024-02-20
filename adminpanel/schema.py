import graphene
from graphene_django.types import DjangoObjectType
from .models import Category,Attribute,AttributeValue

class CategoryType(DjangoObjectType):
    class Meta:
        model = Category

class CreateCategoryMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        parent_category = graphene.ID(required=True)

    category = graphene.Field(CategoryType)

    def mutate(self, info, name, parent_category=None):
        new_category = Category(name=name, parent_category=parent_category)
        new_category.save()

        return CreateCategoryMutation(category=new_category)

class AttributeType(DjangoObjectType):
    class Meta:
        model = Attribute

class CreateAttributeMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)

    attribute = graphene.Field(AttributeType)

    def mutate(self, info, name):
        new_attribute = Attribute(name=name)
        new_attribute.save()

        return CreateAttributeMutation(attribute=new_attribute)

class AttributeValueType(DjangoObjectType):
    class Meta:
        model = AttributeValue

class CreateAttributeValueMutation(graphene.Mutation):
    class Arguments:
        attribute = graphene.String(required=True)
        value = graphene.String(required=True)

    attribute_value = graphene.Field(AttributeValueType)

    def mutate(self, info, attribute, value):
        # Get the Attribute instance based on the provided name
        attribute = Attribute.objects.get(name=attribute)

        # Create a new AttributeValue instance
        attribute_value = AttributeValue(attribute=attribute, value=value)
        attribute_value.save()

        return CreateAttributeValueMutation(attribute_value=attribute_value)

class AttributeWithValuesType(graphene.ObjectType):
    name = graphene.String()
    values = graphene.List(AttributeValueType)

    def resolve_values(self, info):
        return AttributeValue.objects.filter(attribute_id=self.id)

class Query(graphene.ObjectType):
    all_categories = graphene.List(CategoryType)
    all_attributes = graphene.List(AttributeType)
    attribute_values = graphene.List(AttributeValueType, attribute=graphene.Argument(graphene.String, required=True))
    attributes_with_values = graphene.List(AttributeWithValuesType)
    
    def resolve_attributes_with_values(self,info):
        return Attribute.objects.all()

    def resolve_all_categories(self, info):
        return Category.objects.all()
    
    def resolve_all_attributes(self, info):
        return Attribute.objects.all()
    
    def resolve_attribute_values(self, info, attribute):
        try:
            attribute_obj = Attribute.objects.get(name=attribute)
            return AttributeValue.objects.filter(attribute=attribute_obj)
        except Attribute.DoesNotExist:
            raise graphene.ValidationError("Invalid attribute name.")
    

class Mutation(graphene.ObjectType):
    create_category = CreateCategoryMutation.Field()
    create_attribute = CreateAttributeMutation.Field()
    create_attribute_value = CreateAttributeValueMutation.Field()   

schema = graphene.Schema(query=Query, mutation=Mutation)
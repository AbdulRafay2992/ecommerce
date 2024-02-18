import graphene
from graphene_django.types import DjangoObjectType
from .models import Category,Attribute

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

class Query(graphene.ObjectType):
    all_categories = graphene.List(CategoryType)

    def resolve_all_categories(self, info):
        # Fetch all Category objects from the database
        return Category.objects.all()
    
    all_attributes = graphene.List(AttributeType)

    def resolve_all_attributes(self, info):
        # Fetch all Category objects from the database
        return Attribute.objects.all()

class Mutation(graphene.ObjectType):
    create_category = CreateCategoryMutation.Field()
    create_attribute = CreateAttributeMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
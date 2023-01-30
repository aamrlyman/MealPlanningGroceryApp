from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Meal_Ingredient
from .serializers import Meal_IngredientSerializer
from django.shortcuts import get_object_or_404


@api_view(['GET'])
@permission_classes([AllowAny])
def get_ingredients_by_meal_id(request):
    ingredients = Meal_Ingredient.objects.all()
    meal_id = request.query_params.get('meal_id')
    meal_ingredients = ingredients.filter(meal_id = meal_id)
    serializer = Meal_IngredientSerializer(meal_ingredients, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_ingredient_to_meal(request):
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
        serializer = Meal_IngredientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def ingredient_detail(request, pk):
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    ingredient = get_object_or_404(Meal_Ingredient, pk=pk)
    if request.method == 'GET':
        serializer = Meal_IngredientSerializer(ingredient);
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = Meal_IngredientSerializer(ingredient, data=request.data);
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == "DELETE":
             ingredient.delete()
             return Response(status = status.HTTP_204_NO_CONTENT)


    # elif request.method == 'GET':
    #     cars = Car.objects.filter(user_id=request.user.id)
    #     serializer = CarSerializer(cars, many=True)
    #     return Response(serializer.data)

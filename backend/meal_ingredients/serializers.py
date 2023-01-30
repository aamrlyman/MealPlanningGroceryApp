from rest_framework import serializers
from .models import Meal_Ingredient

class Meal_IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal_Ingredient
        fields = ['id', 'name', 'unit', 'quantity', 'meal_id', 'user_id']
        depth = 1
    meal_id = serializers.IntegerField(write_only=True)
    user_id = serializers.IntegerField(write_only=True)
# https://www.django-rest-framework.org/api-guide/serializers/#modelserializer
from rest_framework import serializers
from .models import Schedule, Scheduled_Meal

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ['id', 'user_id']
        depth = 1

class Scheduled_MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scheduled_Meal
        fields = ['id', 'isCooked', 'meal_id', 'schedule_id']
        depth = 1
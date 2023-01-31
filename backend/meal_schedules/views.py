from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Schedule
from .serializers import ScheduleSerializer, Scheduled_MealSerializer
from django.shortcuts import get_object_or_404


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def get_post_Schedules(request):
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
        serializer = ScheduleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        user_schedule = Schedule.objects.filter(user_id=request.user.id)
        serializer = ScheduleSerializer(user_schedule, many=True)
        return Response(serializer.data)

#     pass

# @api_view(["GET", "PUT", "DELETE"])
# @permission_classes([IsAuthenticated])
# def meals_detail(request, meal_id):
#     print(
#         'User ', f"{request.user.id} {request.user.email} {request.user.username}")
#     meal = get_object_or_404(Meal, id=meal_id)
#     if request.method == 'GET':
#         serializer = MealSerializer(meal);
#         return Response(serializer.data)
#     elif request.method == "PUT":
#         serializer = MealSerializer(meal, data=request.data);
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data)
#     elif request.method == "DELETE":
#              meal.delete()
#              return Response(status = status.HTTP_204_NO_CONTENT)


# def get_meal_Schedule_meals():
#     pass


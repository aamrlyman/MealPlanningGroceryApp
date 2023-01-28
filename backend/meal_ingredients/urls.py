from django.urls import path, include
from meal_ingredients import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.get_ingredients_by_meal_id),
    # path('all/', views.get_all_cars),
]

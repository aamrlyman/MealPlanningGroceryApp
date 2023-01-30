from django.urls import path, include
from meal_ingredients import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.get_ingredients_by_meal_id),
    path('add/', views.add_ingredient_to_meal),
    # path('all/', views.get_all_cars),
]

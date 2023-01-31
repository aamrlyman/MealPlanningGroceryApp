from django.urls import path, include
from meals import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.meal_list),
    path('user/', views.meals_list_authenticated),
    path('<int:meal_id>/', views.meals_detail),
    # path('edit/', views.meals_detail),
]


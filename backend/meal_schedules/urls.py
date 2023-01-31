from django.urls import path, include
from meal_schedules import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.get_post_Schedules),
    # path('user/', views.meals_list_authenticated),
    # path('<int:meal_id>/', views.meals_detail),
    # path('edit/', views.meals_detail),
]

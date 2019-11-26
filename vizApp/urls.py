from . import views
from django.urls import path

urlpatterns = [
    path('', views.index, name='index'),
    path('data/dataByStateAndYear', views.data_by_state_and_year, name= 'data by state and year'),
    path('data/dataByState', views.data_by_state, name="data by state"),
    path('data/dataByYear', views.data_by_year, name = "data by year"),
    path('data/dataAll', views.data_all, name = "data all"),
    path('data/stateById', views.stateById, name = "state by id")
]
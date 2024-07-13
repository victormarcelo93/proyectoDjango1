from django.urls import path
from .views import *

urlpatterns = [
    path('', inicio, name='inicio'),
    path('libros/', libros, name='libros'),
    path('autores/', autores, name='autores'),
    path('categorias/', categorias, name='categorias'),
    
]
from django.shortcuts import render

# Create your views here.

def inicio(request):
    return render(request, 'biblioteca/inicio.html')

def libros(request):
    return render(request,'biblioteca/libros.html')

def autores(request):
    return render(request,'biblioteca/autores.html')

def categorias(request):
    return render(request,'biblioteca/categorias.html')
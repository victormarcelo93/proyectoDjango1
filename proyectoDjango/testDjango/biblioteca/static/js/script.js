$(document).ready(function() {
    console.log('Iniciando jQuery');

    $('#btn-cargar').on('click', cargarLibros);

    function cargarLibros() {
        console.log('Cargando libros...');
        $('#spinner').html('<div class="lds-circle"><div></div></div>');

        $.get('https://www.googleapis.com/books/v1/volumes?q=subject:fiction')
            .done(function(data) {
                console.log('Datos recibidos:', data);
                $('#spinner').html('');
                mostrarLibros(data.items);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.error('Error al cargar libros:', textStatus, errorThrown);
                $('#spinner').html('');
            });
    }

    function mostrarLibros(libros) {
        var tabla = $('#tabla');
        tabla.empty(); // Limpiar la tabla antes de agregar nuevas filas

        $.each(libros, function(i, libro) {
            var info = libro.volumeInfo;
            var fila = $('<tr>');
            var title = info.title || 'Sin título';
            var publishedDate = info.publishedDate || 'Desconocido';
            var authors = info.authors ? info.authors.join(', ') : 'Desconocido';
            var categories = info.categories ? info.categories.join(', ') : 'Desconocido';
            var thumbnail = info.imageLinks ? info.imageLinks.thumbnail : '';

            traducirTexto(title, function(tituloTraducido) {
                traducirTexto(authors, function(autoresTraducidos) {
                    traducirTexto(categories, function(generosTraducidos) {
                        fila.append('<td>' + tituloTraducido + '</td>');
                        fila.append('<td>' + publishedDate + '</td>');
                        fila.append('<td>' + autoresTraducidos + '</td>');
                        fila.append('<td>' + generosTraducidos + '</td>');
                        fila.append('<td><img src="' + thumbnail + '" style="max-width: 70px"></td>');
                        var botonVerMas = $('<button>').addClass('btn btn-primary').text('Ver Más');
                        botonVerMas.on('click', function() {
                            traducirTexto(info.description || 'Descripción no disponible.', function(descripcionTraducida) {
                                mostrarDescripcion(descripcionTraducida);
                            });
                        });
                        var tdAcciones = $('<td>').append(botonVerMas);
                        fila.append(tdAcciones);
                        tabla.append(fila);
                        console.log('Libro:', tituloTraducido);
                    });
                });
            });
        });
    }

    function traducirTexto(texto, callback) {
        $.get('https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=' + encodeURIComponent(texto))
            .done(function(data) {
                var traduccion = data[0][0][0];
                callback(traduccion);
            })
            .fail(function() {
                callback(texto); // Si falla la traducción, devolver el texto original
            });
    }

    function mostrarDescripcion(descripcion) {
        $('#descripcionLibro').text(descripcion);
        $('#modalDescripcion').modal('show');
    }
});




    
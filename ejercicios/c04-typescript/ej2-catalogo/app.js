"use strict";
const catalogo = [
    { isbn: "123-A", titulo: "Ficciones", autor: "Jorge Luis Borges", precio: 15000, disponible: true, genero: "Cuentos" },
    { isbn: "124-B", titulo: "1984", autor: "Gabriel García Márquez", precio: 18000, disponible: false, genero: "Novela" },
    { isbn: "125-C", titulo: "El Aleph", autor: "Jorge Luis Borges", precio: 14500, disponible: true },
    { isbn: "126-D", titulo: "Rayuela", autor: "Julio Cortázar", precio: 22000, disponible: true, genero: "Novela" }
];
const inputFiltro = document.querySelector('#filtroAutor');
const botonFiltrar = document.querySelector('#filtrar');
const botonDisponibles = document.querySelector('#mostrarDisponibles');
const botonTodos = document.querySelector('#mostrarTodos');
const listaElement = document.querySelector('#listado');
const statsElement = document.querySelector('#stats');
const buscarPorAutor = (autor) => {
    const resultado = [];
    const textoBuscado = autor.toLowerCase();
    for (const libro of catalogo) {
        if (libro.autor.toLowerCase().includes(textoBuscado)) {
            resultado.push(libro);
        }
    }
    return resultado;
};
const librosDisponibles = () => {
    const resultado = [];
    for (const libro of catalogo) {
        if (libro.disponible) {
            resultado.push(libro);
        }
    }
    return resultado;
};
const precioPromedio = (libros) => {
    if (libros.length === 0)
        return 0;
    let suma = 0;
    for (const libro of libros) {
        suma += libro.precio;
    }
    return suma / libros.length;
};
const renderizar = (libros) => {
    listaElement.innerHTML = "";
    for (const libro of libros) {
        const liElement = document.createElement('li');
        const estado = libro.disponible ? "Disponible" : "Sin stock";
        liElement.textContent = `[${libro.isbn}] ${libro.titulo} - ${libro.autor} | $${libro.precio} | ${estado}`;
        listaElement.appendChild(liElement);
    }
    const cantidad = libros.length;
    const promedio = precioPromedio(libros);
    statsElement.textContent = `${cantidad} libros listados. Precio promedio: $${promedio.toFixed(2)}`;
};
botonFiltrar.addEventListener('click', () => {
    const textoInput = inputFiltro.value;
    renderizar(buscarPorAutor(textoInput));
});
botonDisponibles.addEventListener('click', () => {
    renderizar(librosDisponibles());
});
botonTodos.addEventListener('click', () => {
    inputFiltro.value = "";
    renderizar(catalogo);
});
renderizar(catalogo);

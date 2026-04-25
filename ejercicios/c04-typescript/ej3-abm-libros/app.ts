interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string;
}

let catalogo: Libro[] = [
    { isbn: "123-A", titulo: "Ficciones", autor: "Jorge Luis Borges", precio: 15000, disponible: true, genero: "Cuentos" },
    { isbn: "124-B", titulo: "1984", autor: "Gabriel García Márquez", precio: 18000, disponible: false, genero: "Novela" },
    { isbn: "125-C", titulo: "El Aleph", autor: "Jorge Luis Borges", precio: 14500, disponible: true },
    { isbn: "126-D", titulo: "Rayuela", autor: "Julio Cortázar", precio: 22000, disponible: true, genero: "Novela" }
];

const formElement = document.querySelector('#formularioLibro') as HTMLFormElement;
const inputTitulo = document.querySelector('#inputTitulo') as HTMLInputElement;
const inputAutor = document.querySelector('#inputAutor') as HTMLInputElement;
const inputPrecio = document.querySelector('#inputPrecio') as HTMLInputElement;
const inputGenero = document.querySelector('#inputGenero') as HTMLInputElement;
const inputDisponible = document.querySelector('#inputDisponible') as HTMLInputElement;
const botonAgregar = document.querySelector('#botonAgregar') as HTMLButtonElement;
const errorForm = document.querySelector('#errorForm') as HTMLDivElement;

const inputFiltro = document.querySelector('#filtroAutor') as HTMLInputElement;
const botonFiltrar = document.querySelector('#filtrar') as HTMLButtonElement;
const botonDisponibles = document.querySelector('#mostrarDisponibles') as HTMLButtonElement;
const botonTodos = document.querySelector('#mostrarTodos') as HTMLButtonElement;
const listaElement = document.querySelector('#listado') as HTMLUListElement;
const statsElement = document.querySelector('#stats') as HTMLParagraphElement;

const buscarPorAutor = (autor: string): Libro[] => {
    const resultado: Libro[] = [];
    
    for (const libro of catalogo){
        if (libro.autor.toLowerCase().includes(autor.toLowerCase())){
            resultado.push(libro);
        }
    }
    return resultado;
};

const librosDisponibles = (): Libro[] => {
    const resultado: Libro[] = [];
    for (const libro of catalogo){
        if (libro.disponible){
            resultado.push(libro);
        }
    }
    return resultado;
}

const precioPromedio = (libros: Libro[]): number => {
    if (libros.length === 0) return 0;

    let suma = 0;
    for (const libro of libros){
        suma+= libro.precio;
    }
    return suma / libros.length;
}

const validarFormulario = (): Libro | null => {
    const titulo = inputTitulo.value.trim();
    const autor = inputAutor.value.trim();
    const precio = Number(inputPrecio.value);
    const genero = inputGenero.value.trim();
    const disponible = inputDisponible.checked;

    if (titulo === "" || autor === "" || isNaN(precio) || precio <= 0) {
        return null;
    }

    const nuevoLibro: Libro = {
        isbn: "AUTO-" + Date.now(),
        titulo: titulo,
        autor: autor,
        precio: precio,
        disponible: disponible,
        genero: genero !== "" ? genero : undefined
    };

    return nuevoLibro;
};

const agregarLibro = (libro: Libro): void => {
    catalogo.push(libro);
    renderizar(catalogo);
}

const eliminarLibro = (isbn: string): void => {
    catalogo = catalogo.filter(libro => libro.isbn !== isbn);
    renderizar(catalogo);
}

const renderizar = (libros: Libro[]): void => {
    listaElement.innerHTML = "";

    for (const libro of libros){
        const liElement = document.createElement('li');
        const estado = libro.disponible ? "Disponible" : "Sin stock";

        liElement.textContent = `[${libro.isbn}] ${libro.titulo} - ${libro.autor} | $${libro.precio} | ${estado}`;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener('click', () => {
            eliminarLibro(libro.isbn);
        });

        liElement.appendChild(botonEliminar);
        listaElement.appendChild(liElement);
    }

    const cantidad = libros.length;
    const promedio = precioPromedio(libros);
    statsElement.textContent = `${cantidad} libros listados. Precio promedio: $${promedio.toFixed(2)}`;
};

botonAgregar.addEventListener('click', () => {
    const resultadoValidacion = validarFormulario();

    if (resultadoValidacion === null){
        errorForm.textContent = "Error: completar título, autor y verificar que el precio sea mayor a 0.";
    } else {
        errorForm.textContent = "";
        agregarLibro(resultadoValidacion);
        formElement.reset();
    }
})

botonFiltrar.addEventListener('click', () => {
    const textoInput = inputFiltro.value;
    renderizar(buscarPorAutor(textoInput));
});

botonDisponibles.addEventListener('click', () => {
    renderizar(librosDisponibles());
})

botonTodos.addEventListener('click', () => {
    inputFiltro.value = "";
    renderizar(catalogo);
});

renderizar(catalogo);
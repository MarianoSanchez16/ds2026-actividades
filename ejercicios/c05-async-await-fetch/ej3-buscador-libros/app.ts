interface LibroOL {
    title: string;
    author_name?: string[];
    first_publish_year?: number;
}

interface RespuestaOL {
    docs: LibroOL[];
}

const inputBusqueda = document.querySelector('#inputBusqueda') as HTMLInputElement;
const botonBuscar = document.querySelector('#botonBuscar') as HTMLButtonElement;
const resultadosDiv = document.querySelector('#resultados') as HTMLDivElement;
const errorElement = document.querySelector('#error') as HTMLParagraphElement;
const cargandoElement = document.querySelector('#cargando') as HTMLParagraphElement;

const buscarLibros = async (query: string): Promise<void> => {
    try {
        cargandoElement.style.display = 'block';
        errorElement.style.display = 'none';
        resultadosDiv.innerHTML = '';

        const url = `https://openlibrary.org/search.json?q=${query.replace(/\s+/g, '+')}`;
        const response = await fetch(url);

        if (!response.ok){
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data: RespuestaOL = await response.json();

        cargandoElement.style.display = 'none';

        const primeros10 = data.docs.slice(0, 10);

        if (primeros10.length === 0){
            resultadosDiv.innerHTML = '<p>No se encontraron resultados para tu búsqueda.</p>';
            return;
        }

        for (const libro of primeros10){
            const card = document.createElement('div');
            card.className = 'card';

            const titulo = document.createElement('h3');
            titulo.textContent = libro.title;
            card.appendChild(titulo);

            if (libro.author_name && libro.author_name.length > 0){
                const autor = document.createElement('p');
                autor.textContent = `Autor/es: ${libro.author_name.join(', ')}`;
                card.appendChild(autor);
            }

            if (libro.first_publish_year){
                const anio = document.createElement('p');
                anio.textContent = `Año de publicación: ${libro.first_publish_year}`;
                card.appendChild(anio);
            }

            resultadosDiv.appendChild(card);
        }
    } catch (error){
        console.error('Error al obtener los datos:', error);
        cargandoElement.style.display = 'none';
        errorElement.textContent = 'Hubo un problema de red al buscar los libros.';
        errorElement.style.display = 'block';
    }
};

botonBuscar.addEventListener('click', () => {
    const query = inputBusqueda.value.trim();

    if (query === ""){
        errorElement.textContent = 'Error: Por favor ingresa un título o autor válido.';
        errorElement.style.display = 'block';
        resultadosDiv.innerHTML = '';
        return;
    }
    
    buscarLibros(query);
})
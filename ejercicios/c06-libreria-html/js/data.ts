interface LibroOL {
    title: string;
    author_name?: string[];
    first_publish_year?: number;
}

interface RespuestaOL {
    docs: LibroOL[];
}

const botonBuscar = document.querySelector('#botonBuscar') as HTMLButtonElement | null;
const inputBusqueda = document.querySelector('#inputBusqueda') as HTMLInputElement | null;
const contenedorResultados = document.querySelector('#contenedorResultados') as HTMLDivElement | null;
const mensajeError = document.querySelector('#mensajeError') as HTMLDivElement | null;
const mensajeCargando = document.querySelector('#mensajeCargando') as HTMLDivElement | null;

if (botonBuscar && inputBusqueda && contenedorResultados && mensajeError && mensajeCargando) {
    const buscarLibros = async (query: string): Promise<void> => {
        try{
            mensajeCargando.style.display = 'block';
            mensajeError.style.display = 'none';
            contenedorResultados.innerHTML = '';

            const url = `https://openlibrary.org/search.json?q=${query.replace(/\s+/g, '+')}`;
            const response = await fetch(url);

            if (!response.ok){
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data: RespuestaOL = await response.json();
            mensajeCargando.style.display = 'none';

            const primeros10 = data.docs.slice(0, 10);

            if (primeros10.length === 0){
                mensajeError.textContent = 'No se encontraron resultados para tu búsqueda.';
                mensajeError.style.display = 'block';
                return;
            }

            for (const libro of primeros10){
                const colDiv = document.createElement('div');
                colDiv.className = 'col-md-4';

                const autor = libro.author_name ? libro.author_name.join(', ') : 'Autor desconocido';
                const anio = libro.first_publish_year ? libro.first_publish_year : 'Año desconocido';

                colDiv.innerHTML = `
                    <div class="card h-100 shadow-sm">
                        <img src="https://picsum.photos/300/400?random=${Math.random()}" class="card-img-top" alt="Portada de ${libro.title}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${libro.title}</h5>
                            <p class="card-text text-muted mb-1">${autor}</p>
                            <p class="card-text text-secondary mb-3"><small>Publicado: ${anio}</small></p>
                            <a href="libro.html" class="btn btn-outline-primary mt-auto">Ver más</a>
                        </div>
                    </div>
                `;

                contenedorResultados.appendChild(colDiv);
            }
        } catch(error){
            console.error('Error al buscar:', error);
            mensajeCargando.style.display = 'none';
            mensajeError.textContent = 'Hubo un problema al buscar los libros.';
            mensajeError.style.display = 'block';
        }
    };

    botonBuscar.addEventListener('click', () => {
        const query = inputBusqueda.value.trim();
        if (query === ""){
            mensajeError.textContent = 'Por favor ingresa un título o autor válido.';
            mensajeError.style.display = 'block';
            contenedorResultados.innerHTML = '';
            return;
        }
        buscarLibros(query);
    });
}
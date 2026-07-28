import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

interface Libro {
    id: number;
    titulo: string;
    autor: string;
    precio: number;
    imagen: string;
    disponible: boolean; // Agregamos la propiedad para el filtro
}

interface Autor {
    id: number;
    nombre: string;
    nacionalidad: string;
}

const libros: Libro[] = [
    {
        id: 1, 
        titulo: "Ficciones", 
        autor: "Jorge Luis Borges", 
        precio: 15000, 
        imagen: "https://acdn-us.mitiendanube.com/stores/001/542/126/products/9789875666474-9169a61b8a651143a816944491431237-1024-1024.webp",
        disponible: true 
    },
    {
        id: 2, 
        titulo: "1984", 
        autor: "George Orwell", 
        precio: 18000, 
        imagen: "https://acdn-us.mitiendanube.com/stores/001/542/126/products/9789875669284-3ad1b3b3afa33e6cb016944487223033-480-0.webp",
        disponible: false
    },
    {
        id: 3, 
        titulo: "Rayuela", 
        autor: "Julio Cortázar", 
        precio: 22000, 
        imagen: "https://acdn-us.mitiendanube.com/stores/001/542/126/products/9789877252538-8a4d6e142eeef3ac1a16944487744912-1024-1024.webp",
        disponible: true 
    }
];

const autores: Autor[] = [
    { id: 1, nombre: "Jorge Luis Borges", nacionalidad: "Argentino" },
    { id: 2, nombre: "George Orwell", nacionalidad: "Británico" },
    { id: 3, nombre: "Julio Cortázar", nacionalidad: "Argentino" }
];

app.get('/', (_req, res) => {
    res.json({ mensaje: "API de la Librería funcionando de forma exitosa 🐳" });
});

app.get('/libros', (req, res) => {
    const { disponible } = req.query;

    if (disponible !== undefined) {
        const filtrarDisponibles = disponible === 'true';
        const librosFiltrados = libros.filter(libro => libro.disponible === filtrarDisponibles);
        return res.json(librosFiltrados);
    }

    res.json(libros);
});

app.get('/autores', (_req, res) => {
    res.json(autores);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo correctamente en http://localhost:${PORT}`);
});
import { Libro } from '../types/libro.types';

const libros: Libro[] = [
    {
        id: 1, 
        titulo: "Ficciones", 
        autor: "Jorge Luis Borges", 
        precio: 15000, 
        imagen: "https://acdn-us.mitiendanube.com/stores/001/542/126/products/9789875666474-1024-1024.webp", 
        disponible: true 
    },
    {
        id: 2, 
        titulo: "1984", 
        autor: "George Orwell", 
        precio: 18000, 
        imagen: "https://acdn-us.mitiendanube.com/stores/001/542/126/products/9789875669284-480-0.webp", 
        disponible: false 
    },
    {
        id: 3, 
        titulo: "Rayuela", 
        autor: "Julio Cortázar", 
        precio: 22000, 
        imagen: "https://acdn-us.mitiendanube.com/stores/001/542/126/products/9789877252538-1024-1024.webp", 
        disponible: true 
    }
];

let proximoId = 4;

export const libroService = {
    findAll: (disponible?: boolean): Libro[] => {
        if (disponible !== undefined) {
            return libros.filter(l => s.disponible === disponible);
        }
        return libros;
    },

    findById: (id: number): Libro | undefined => {
        return libros.find(l => l.id === id);
    },

    create: (datos: Omit<Libro, 'id'>): Libro => {
        const nuevoLibro: Libro = {
            id: proximoId++,
            ...datos
        };
        libros.push(nuevoLibro);
        return nuevoLibro;
    },

    update: (id: number, datos: Omit<Libro, 'id'>): Libro | undefined => {
        const indice = libros.findIndex(l => l.id === id);
        if (indice === -1) return undefined;
        
        libros[indice] = { id, ...datos };
        return libros[indice];
    },

    remove: (id: number): boolean => {
        const indice = libros.findIndex(l => l.id === id);
        if (indice === -1) return false;
        
        libros.splice(indice, 1);
        return true;
    }
};
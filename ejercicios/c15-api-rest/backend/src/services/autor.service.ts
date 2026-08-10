import { Autor } from '../types/autor.types';

const autores: Autor[] = [
    { id: 1, nombre: "Jorge Luis Borges", nacionalidad: "Argentino" },
    { id: 2, nombre: "George Orwell", nacionalidad: "Británico" },
    { id: 3, nombre: "Julio Cortázar", nacionalidad: "Argentino" }
];

let proximoId = 4;

export const autorService = {
    findAll: (): Autor[] => {
        return autores;
    },

    findById: (id: number): Autor | undefined => {
        return autores.find(a => a.id === id);
    },

    create: (datos: Omit<Autor, 'id'>): Autor => {
        const nuevoAutor: Autor = {
        id: proximoId++,
        ...datos
        };
        autores.push(nuevoAutor);
        return nuevoAutor;
    },

    update: (id: number, datos: Omit<Autor, 'id'>): Autor | undefined => {
        const indice = autores.findIndex(a => a.id === id);
        if (indice === -1) return undefined;

        autores[indice] = { id, ...datos };
        return autores[indice];
    },

    remove: (id: number): boolean => {
        const indice = autores.findIndex(a => a.id === id);
        if (indice === -1) return false;

        autores.splice(indice, 1);
        return true;
    }
};
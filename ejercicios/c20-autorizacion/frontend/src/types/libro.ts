import type { Autor } from './autor';

export interface Libro {
    id: number;
    titulo: string;
    precio: number;
    imagen: string;
    disponible: boolean;
    autorId: number;
    autor?: Autor;
}
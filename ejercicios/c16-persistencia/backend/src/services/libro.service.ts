import { prisma } from '../config/prisma';
import { Libro } from '../types/libro.types';

export const libroService = {
    findAll: async (disponible?: boolean): Promise<Libro[]> => {
        if (disponible !== undefined) {
            return await prisma.libro.findMany({
                where: { disponible }
            });
        }
        return await prisma.libro.findMany();
    },

    findById: async (id: number): Promise<Libro | null> => {
        return await prisma.libro.findUnique({
            where: { id }
        });
    },

    create: async (datos: Omit<Libro, 'id'>): Promise<Libro> => {
        return await prisma.libro.create({
            data: datos
        });
    },

    update: async (id: number, datos: Omit<Libro, 'id'>): Promise<Libro | null> => {
        const existe = await prisma.libro.findUnique({ where: { id } });
        if (!existe) return null;

        return await prisma.libro.update({
            where: { id },
            data: datos
        });
    },

    remove: async (id: number): Promise<boolean> => {
        const existe = await prisma.libro.findUnique({ where: { id } });
        if (!existe) return false;

        await prisma.libro.delete({
            where: { id }
        });
        return true;
    }
};
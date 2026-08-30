import { prisma } from '../config/prisma';
import { Autor } from '../types/autor.types';

export const autorService = {
    findAll: async (): Promise<Autor[]> => {
        return await prisma.autor.findMany();
    },

    findById: async (id: number): Promise<Autor | null> => {
        return await prisma.autor.findUnique({
            where: { id }
        });
    },

    create: async (datos: Omit<Autor, 'id'>): Promise<Autor> => {
        return await prisma.autor.create({
            data: datos
        });
    },

    update: async (id: number, datos: Omit<Autor, 'id'>): Promise<Autor | null> => {
        const existe = await prisma.autor.findUnique({ where: { id } });
        if (!existe) return null;

        return await prisma.autor.update({
            where: { id },
            data: datos
        });
    },

    remove: async (id: number): Promise<boolean> => {
        const existe = await prisma.autor.findUnique({ where: { id } });
        if (!existe) return false;

        await prisma.autor.delete({
            where: { id }
        });
        return true;
    }
};
import { prisma } from '../config/prisma';
import { Prisma } from '../generated/prisma';

export type LibroConAutor = Prisma.LibroGetPayload<{ include: { autor: true } }>;
export type LibroDetalle = Prisma.LibroGetPayload<{ include: { autor: true; categorias: true } }>;

export const libroService = {
    findAll: async (disponible?: boolean): Promise<LibroConAutor[]> => {
        return await prisma.libro.findMany({
            where: disponible !== undefined ? { disponible } : {},
            include: { autor: true }
        });
    },

    findById: async (id: number): Promise<LibroDetalle | null> => {
        return await prisma.libro.findUnique({
            where: { id },
            include: { autor: true, categorias: true }
        });
    },

    create: async (datos: { titulo: string; precio: number; imagen: string; disponible?: boolean; autorId: number; categoriaIds?: number[] }) => {
        const { categoriaIds, ...rest } = datos;
        return await prisma.libro.create({
            data: {
                ...rest,
                categorias: categoriaIds ? {
                    connect: categoriaIds.map(id => ({ id }))
                } : undefined
            },
            include: { autor: true, categorias: true }
        });
    },

    update: async (id: number, datos: { titulo?: string; precio?: number; imagen?: string; disponible?: boolean; autorId?: number; categoriaIds?: number[] }) => {
        const { categoriaIds, ...rest } = datos;
        return await prisma.libro.update({
            where: { id },
            data: {
                ...rest,
                categorias: categoriaIds ? {
                    set: categoriaIds.map(id => ({ id }))
                } : undefined
            },
            include: { autor: true, categorias: true }
        });
    },

    remove: async (id: number): Promise<boolean> => {
        const existe = await prisma.libro.findUnique({ where: { id } });
        if (!existe) return false;

        await prisma.libro.delete({ where: { id } });
        return true;
    }
};
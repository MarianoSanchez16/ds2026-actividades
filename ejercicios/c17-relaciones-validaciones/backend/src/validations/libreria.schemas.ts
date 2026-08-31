import { z } from 'zod';

export const idParamSchema = z.object({
    id: z.coerce.number().int().positive({ message: "El ID debe ser un número entero positivo." }),
});

export const autorCreateSchema = z.object({
    nombre: z.string().trim().min(3, { message: "El nombre debe poseer al menos 3 caracteres." }),
    nacionalidad: z.string().trim().min(2, { message: "La nacionalidad es obligatoria." }),
});

export const autorUpdateSchema = autorCreateSchema.partial();

export const libroCreateSchema = z.object({
    titulo: z.string().trim().min(1, { message: "El título es obligatorio." }),
    precio: z.number().positive({ message: "El precio debe ser un número mayor a 0." }),
    imagen: z.string().trim().url({ message: "La ruta de la imagen debe ser una URL válida." }).or(z.literal("")),
    disponible: z.boolean().optional(),
    autorId: z.number().int().positive({ message: "Se requiere un ID de autor válido." }),
    categoriaIds: z.array(z.number().int().positive()).optional()
});

export const libroUpdateSchema = libroCreateSchema.partial();
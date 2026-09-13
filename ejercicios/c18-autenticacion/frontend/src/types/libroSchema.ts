import { z } from 'zod';

export const libroSchema = z.object({
    titulo: z.string().trim().min(1, 'El título es obligatorio'),
    autor: z.string().trim().min(1, 'El autor es obligatorio'),
    precio: z.coerce.number().positive('El precio debe ser mayor a 0'),
    imagen: z.string().url('Debe ser una URL válida').or(z.literal(''))
});

export type LibroValidado = z.infer<typeof libroSchema>;
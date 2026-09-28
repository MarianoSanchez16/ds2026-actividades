import { z } from 'zod';

export const registroSchema = z.object({
    nombre: z.string().trim().min(1, 'El nombre es obligatorio'),
    email: z.string().trim().email('Debe ser un email válido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const loginSchema = z.object({
    email: z.string().trim().email('Debe ser un email válido'),
    password: z.string().min(1, 'La contraseña es requerida'),
});

export type Registro = z.infer<typeof registroSchema>;
export type Login = z.infer<typeof loginSchema>;
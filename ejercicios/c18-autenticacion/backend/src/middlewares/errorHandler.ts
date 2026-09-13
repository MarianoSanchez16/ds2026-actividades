import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '../generated/prisma';

export const errorHandler = (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (err instanceof ZodError) {
        return res.status(400).json({
            error: "Datos provistos inválidos.",
            detalles: err.issues.map(issue => ({
                campo: issue.path.join("."),
                mensaje: issue.message
            }))
        });
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
            return res.status(409).json({ error: "Conflicto: Ya existe un registro con esos datos únicos." });
            
            case "P2025":
            return res.status(404).json({ error: "Recurso no encontrado en la base de datos." });
            
            case "P2003":
            return res.status(409).json({ 
                error: "Operación bloqueada: No se puede eliminar el registro debido a que existen otros elementos en el sistema que dependen de él." 
            });
            
            default:
            break;
        }
    }

    console.error("Error no controlado:", err);
    res.status(500).json({ error: "Ocurrió un error inesperado en el servidor." });
};
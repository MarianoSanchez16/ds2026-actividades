import { Request, Response } from 'express';
import { libroService } from '../services/libro.service';

export const libroController = {
    getAll: async (req: Request, res: Response) => {
        const { disponible } = req.query;
        let filtro: boolean | undefined = undefined;

        if (disponible !== undefined) {
            filtro = disponible === 'true';
        }

        const resultado = await libroService.findAll(filtro);
        res.json(resultado);
    },

    getById: async (req: Request, res: Response) => {
        const libro = await libroService.findById(req.params.id as any);
        if (!libro) {
            return res.status(404).json({ error: "El libro no existe." });
        }
        res.json(libro);
    },

    create: async (req: Request, res: Response) => {
        const nuevoLibro = await libroService.create(req.body);
        res.status(201).json(nuevoLibro);
    },

    update: async (req: Request, res: Response) => {
        const libroActualizado = await libroService.update(req.params.id as any, req.body);
        res.json(libroActualizado);
    },

    delete: async (req: Request, res: Response) => {
        const eliminado = await libroService.remove(req.params.id as any);
        if (!eliminado) {
            return res.status(404).json({ error: "El libro no existe." });
        }
        res.status(204).send();
    }
};
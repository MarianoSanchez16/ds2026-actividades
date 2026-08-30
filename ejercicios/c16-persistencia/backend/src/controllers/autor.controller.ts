import { Request, Response } from 'express';
import { autorService } from '../services/autor.service';

export const autorController = {
    getAll: async (_req: Request, res: Response) => {
        try {
            const resultado = await autorService.findAll();
            res.json(resultado);
        } catch (error) {
            res.status(500).json({ error: "Error al recuperar los autores." });
        }
    },

    getById: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: "ID provisto inválido." });
            }

            const autor = await autorService.findById(id);
            if (!autor) {
                return res.status(404).json({ error: "Autor no encontrado." });
            }

            res.json(autor);
        } catch (error) {
            res.status(500).json({ error: "Error al recuperar el autor." });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const { nombre, nacionalidad } = req.body;
            if (!nombre || !nacionalidad) {
                return res.status(400).json({ error: "El nombre y nacionalidad son requeridos." });
            }

            const nuevoAutor = await autorService.create({ nombre, nacionalidad });
            res.status(201).json(nuevoAutor);
        } catch (error) {
            res.status(500).json({ error: "Error al registrar el autor." });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const { nombre, nacionalidad } = req.body;

            if (isNaN(id) || !nombre || !nacionalidad) {
                return res.status(400).json({ error: "Datos de actualización inválidos." });
            }

            const autorActualizado = await autorService.update(id, { nombre, nacionalidad });
            if (!autorActualizado) {
                return res.status(404).json({ error: "No se encontró el autor especificado." });
            }

            res.json(autorActualizado);
        } catch (error) {
            res.status(500).json({ error: "Error al modificar el autor." });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: "ID inválido." });
            }

            const eliminado = await autorService.remove(id);
            if (!eliminado) {
                return res.status(404).json({ error: "El autor no existe." });
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: "Error al remover el autor." });
        }
    }
};
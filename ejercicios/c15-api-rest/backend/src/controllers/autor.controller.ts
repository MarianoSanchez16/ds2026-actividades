import { Request, Response } from 'express';
import { autorService } from '../services/autor.service';

export const autorController = {
    getAll: (_req: Request, res: Response) => {
        try {
        const resultado = autorService.findAll();
        res.json(resultado);
        } catch (error) {
        res.status(500).json({ error: "Error al recuperar los autores." });
        }
    },

    getById: (req: Request, res: Response) => {
        try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID provisto inválido." });
        }

        const autor = autorService.findById(id);
        if (!autor) {
            return res.status(404).json({ error: "Autor no encontrado." });
        }

        res.json(autor);
        } catch (error) {
        res.status(500).json({ error: "Error al recuperar el autor." });
        }
    },

    create: (req: Request, res: Response) => {
        try {
        const { nombre, nacionalidad } = req.body;
        if (!nombre || !nacionalidad) {
            return res.status(400).json({ error: "El nombre y la nacionalidad son requeridos." });
        }

        const nuevoAutor = autorService.create({ nombre, nacionalidad });
        res.status(201).json(nuevoAutor);
        } catch (error) {
        res.status(500).json({ error: "Error al registrar el autor." });
        }
    },

    update: (req: Request, res: Response) => {
        try {
        const id = Number(req.params.id);
        const { nombre, nacionalidad } = req.body;

        if (isNaN(id) || !nombre || !nacionalidad) {
            return res.status(400).json({ error: "Datos provistos para la actualización son insuficientes." });
        }

        const autorActualizado = autorService.update(id, { nombre, nacionalidad });
        if (!autorActualizado) {
            return res.status(404).json({ error: "No se encontró el autor especificado." });
        }

        res.json(autorActualizado);
        } catch (error) {
        res.status(500).json({ error: "Error al modificar el autor." });
        }
    },

    delete: (req: Request, res: Response) => {
        try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID de autor no válido." });
        }

        const eliminado = autorService.remove(id);
        if (!eliminado) {
            return res.status(404).json({ error: "El autor no existe." });
        }

        res.status(204).send();
        } catch (error) {
        res.status(500).json({ error: "Error al remover el autor." });
        }
    }
};
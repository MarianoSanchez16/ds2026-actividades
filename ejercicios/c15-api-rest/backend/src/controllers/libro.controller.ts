import { Request, Response } from 'express';
import { libroService } from '../services/libro.service';

export const libroController = {
    getAll: (req: Request, res: Response) => {
    try {
        const { disponible } = req.query;
        let filtro: boolean | undefined = undefined;

        if (disponible !== undefined) {
        filtro = disponible === 'true';
        }

        const resultado = libroService.findAll(filtro);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: "Error interno al recuperar los libros." });
    }
    },

    getById: (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
        return res.status(400).json({ error: "El ID provisto es inválido." });
        }

        const libro = libroService.findById(id);
        if (!libro) {
        return res.status(404).json({ error: "Libro no encontrado." });
        }

        res.json(libro);
    } catch (error) {
        res.status(500).json({ error: "Error al recuperar el libro." });
    }
    },

    create: (req: Request, res: Response) => {
    try {
        const { titulo, autor, precio, imagen, disponible } = req.body;
        if (!titulo || !autor || precio === undefined) {
        return res.status(400).json({ error: "Faltan campos obligatorios para dar de alta el libro." });
        }

        const nuevoLibro = libroService.create({ titulo, autor, precio, imagen: imagen || "", disponible: !!disponible });
        res.status(201).json(nuevoLibro);
    } catch (error) {
        res.status(500).json({ error: "Error al registrar el libro." });
    }
    },

    update: (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { titulo, autor, precio, imagen, disponible } = req.body;

        if (isNaN(id) || !titulo || !autor || precio === undefined) {
        return res.status(400).json({ error: "Datos de actualización inválidos." });
        }

        const libroActualizado = libroService.update(id, { titulo, autor, precio, imagen: imagen || "", disponible: !!disponible });
        if (!libroActualizado) {
        return res.status(404).json({ error: "No se encontró el libro especificado para actualizar." });
        }

        res.json(libroActualizado);
    } catch (error) {
        res.status(500).json({ error: "Error al modificar el libro." });
    }
    },

    delete: (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
        return res.status(400).json({ error: "ID de libro inválido." });
        }

        const eliminado = libroService.remove(id);
        if (!eliminado) {
        return res.status(404).json({ error: "El libro especificado no existe." });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Error al remover el libro." });
    }
    }
};
import { Request, Response } from 'express';
import { libroService } from '../services/libro.service';

export const libroController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const { disponible } = req.query;
            let filtro: boolean | undefined = undefined;

            if (disponible !== undefined) {
                filtro = disponible === 'true';
            }

            const resultado = await libroService.findAll(filtro);
            res.json(resultado);
        } catch (error) {
            res.status(500).json({ error: "Error al recuperar los libros de la base de datos." });
        }
    },

    getById: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: "El ID provisto es inválido." });
            }

            const libro = await libroService.findById(id);
            if (!libro) {
                return res.status(404).json({ error: "Libro no encontrado." });
            }

            res.json(libro);
        } catch (error) {
            res.status(500).json({ error: "Error al buscar el libro." });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const { titulo, autor, precio, imagen, disponible } = req.body;
            if (!titulo || !autor || precio === undefined) {
                return res.status(400).json({ error: "Faltan campos obligatorios." });
            }

            const nuevoLibro = await libroService.create({
                titulo,
                autor,
                precio,
                imagen: imagen || "",
                disponible: disponible !== undefined ? !!disponible : true
            });
            res.status(201).json(nuevoLibro);
        } catch (error) {
            res.status(500).json({ error: "Error al registrar el libro." });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const { titulo, autor, precio, imagen, disponible } = req.body;

            if (isNaN(id) || !titulo || !autor || precio === undefined) {
                return res.status(400).json({ error: "Datos de actualización inválidos." });
            }

            const libroActualizado = await libroService.update(id, {
                titulo,
                autor,
                precio,
                imagen: imagen || "",
                disponible: !!disponible
            });

            if (!libroActualizado) {
                return res.status(404).json({ error: "El libro no existe para actualizar." });
            }

            res.json(libroActualizado);
        } catch (error) {
            res.status(500).json({ error: "Error al modificar el libro." });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: "ID de libro inválido." });
            }

            const eliminado = await libroService.remove(id);
            if (!eliminado) {
                return res.status(404).json({ error: "El libro especificado no existe." });
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: "Error al remover el libro." });
        }
    }
};
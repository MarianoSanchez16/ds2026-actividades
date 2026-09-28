import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import libroRoutes from './routes/libro.routes';
import autorRoutes from './routes/autor.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

const originsPermitidos = [process.env.FRONTEND_URL ?? 'http://localhost:5173'];

app.use(cors({
    origin: originsPermitidos,
    credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/libros', libroRoutes);
app.use('/api/autores', autorRoutes);

app.use((_req, res) => {
    res.status(404).json({ error: 'La ruta solicitada no existe en esta API.' });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Backend de la librería escuchando en http://localhost:${PORT}`);
});
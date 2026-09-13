import express from 'express';
import cors from 'cors';
import libroRoutes from './routes/libro.routes';
import autorRoutes from './routes/autor.routes';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/libros', libroRoutes);
app.use('/api/autores', autorRoutes);

app.use(errorHandler);

app.use((_req, res) => {
    res.status(404).json({ error: 'La ruta solicitada no existe en esta API.' });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

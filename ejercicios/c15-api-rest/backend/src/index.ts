import express from 'express';
import cors from 'cors';
import libroRoutes from './routes/libro.routes';
import autorRoutes from './routes/autor.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/libros', libroRoutes);
app.use('/api/autores', autorRoutes);

app.use((_req, res) => {
    res.status(404).json({ error: "La ruta solicitada no existe en esta API." });
});

app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(` 🐳 Servidor de la Librería corriendo en Capas con Éxito`);
    console.log(` 🔌 Escuchando en: http://localhost:${PORT}`);
    console.log(`=======================================================`);
});
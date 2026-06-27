import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { Catalogo } from './pages/Catalogo';
import { LibroDetalle } from './pages/LibroDetalle';
import { LibroNuevo } from './pages/LibroNuevo';
import type { LibroCardProps } from './types/LibroCardProps';
import type { LibroValidado } from './types/libroSchema';

const librosIniciales: LibroCardProps[] = [
  { id: 1, titulo: "Ficciones", autor: "Jorge Luis Borges", precio: 15000, imagen: "https://acdn-us.mitiendanube.com/stores/001/542/126/products/9789875666474-9169a61b8a651143a816944491431237-1024-1024.webp" },
  { id: 2, titulo: "1984", autor: "George Orwell", precio: 18000, imagen: "https://acdn-us.mitiendanube.com/stores/001/542/126/products/9789875669284-3ad1b3b3afa33e6cb016944487223033-480-0.webp" },
  { id: 3, titulo: "Rayuela", autor: "Julio Cortázar", precio: 22000, imagen: "https://acdn-us.mitiendanube.com/stores/001/542/126/products/9789877252538-8a4d6e142eeef3ac1a16944487744912-1024-1024.webp" }
];

export default function App() {
  const [libros, setLibros] = useState<LibroCardProps[]>(librosIniciales);

  const agregarLibro = (nuevoLibro: LibroValidado) => {
    setLibros([...libros, { ...nuevoLibro, id: Date.now(), imagen: nuevoLibro.imagen || "https://picsum.photos/300/400?random=4" }]);
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home libros={libros} />} />
        <Route path="/catalogo" element={<Catalogo libros={libros} />} />
        <Route path="/libros/:id" element={<LibroDetalle libros={libros} />} />
        <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
      </Routes>
    </Layout>
  );
}
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spinner, Alert } from 'react-bootstrap';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { Catalogo } from './pages/Catalogo';
import { LibroDetalle } from './pages/LibroDetalle';
import { LibroNuevo } from './pages/LibroNuevo';
import { useFetch } from './hooks/useFetch';
import type { LibroCardProps } from './types/LibroCardProps';
import type { LibroValidado } from './types/libroSchema';

export default function App() {
  const [libros, setLibros] = useState<LibroCardProps[]>([]);
  const { data, loading, error } = useFetch<LibroCardProps[]>('/libros.json');

  useEffect(() => {
    if (data) setLibros(data);
  }, [data]);

  const agregarLibro = (nuevoLibro: LibroValidado) => {
    setLibros([...libros, { ...nuevoLibro, id: Date.now(), imagen: nuevoLibro.imagen || "https://picsum.photos/300/400?random=4" }]);
  };

  return (
    <Layout>
      {loading && <div className="text-center my-5"><Spinner animation="border" /></div>}
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}
      
      {!loading && !error && (
        <Routes>
          <Route path="/" element={<Home libros={libros} />} />
          <Route path="/catalogo" element={<Catalogo libros={libros} />} />
          <Route path="/libros/:id" element={<LibroDetalle libros={libros} />} />
          <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
        </Routes>
      )}
    </Layout>
  );
}
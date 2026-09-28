import { Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Catalogo from './pages/Catalogo';
import Login from './pages/Login';
import LibroNuevo from './pages/LibroNuevo';
import SinPermiso from './pages/SinPermiso';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Catalogo />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sin-permiso" element={<SinPermiso />} />

        {/* Rutas Protegidas Exclusivas de ADMIN */}
        <Route element={<PrivateRoute rol="ADMIN" />}>
        <Route path="/libros/nuevo" element={<LibroNuevo />} />
        </Route>
      </Routes>
    </>
  );
}
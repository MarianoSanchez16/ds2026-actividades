import { Navigate, Outlet } from 'react-router-dom';
import { Spinner, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
    rol?: 'ADMIN' | 'CLIENTE';
}

export default function PrivateRoute({ rol }: PrivateRouteProps) {
    const { usuario, cargando } = useAuth();

    if (cargando) {
        return (
            <Container className="text-center my-5 py-5">
                <Spinner animation="border" variant="primary" role="status">
                    <span className="visually-hidden">Cargando sesión...</span>
                </Spinner>
            </Container>
        );
    }

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    if (rol && usuario.rol !== rol) {
        return <Navigate to="/sin-permiso" replace />;
    }

    return <Outlet />;
}
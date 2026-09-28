import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
    const { usuario, logout, tieneRol } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/catalogo">📚 Librería</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
                        {tieneRol('ADMIN') && (
                        <Nav.Link as={Link} to="/libros/nuevo">Nuevo Libro</Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        {usuario ? (
                        <>
                            <Navbar.Text className="me-3">
                                Hola, <strong>{usuario.nombre}</strong>
                            </Navbar.Text>
                            <Button variant="outline-light" size="sm" onClick={handleLogout}>
                                Salir
                            </Button>
                        </>
                        ) : (
                        <Button as={Link as any} to="/login" variant="primary" size="sm">
                            Ingresar
                        </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

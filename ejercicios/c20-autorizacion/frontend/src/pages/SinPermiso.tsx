import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function SinPermiso() {
    return (
        <Container className="my-5 d-flex justify-content-center">
            <Card className="shadow-sm border-0 text-center p-4" style={{ maxWidth: '480px' }}>
                <Card.Body>
                    <h2 className="text-danger fw-bold mb-3">403 - Acceso Restringido</h2>
                    <p className="text-muted mb-4">
                        No poseés los permisos de administrador requeridos para acceder a esta sección.
                    </p>
                    <Button as={Link as any} to="/catalogo" variant="primary">
                        Volver al Catálogo
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}
import { useParams, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export function LibroDetalle() {
    const { id } = useParams<{ id: string }>();

    return (
    <div className="text-center my-5">
        <h2>Detalle del libro {id}</h2>
        <p className="text-muted">Aquí se mostrará la información detallada del libro con ID: {id}</p>
        <Button as={Link} to="/catalogo" variant="dark" className="mt-3">
            Volver al catálogo
        </Button>
    </div>
    );
}
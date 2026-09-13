import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LibroCard } from '../components/LibroCard';
import type { LibroCardProps } from '../types/LibroCardProps';

type Props = {
    libros: LibroCardProps[];
};

export function Home({ libros }: Props) {
    const librosDestacados = libros.slice(0, 3);

    return (
        <Container>
            <div className="text-center my-5">
                <h1>Bienvenido a Mi Librería</h1>
                <p className="lead">Encuentra los mejores libros al mejor precio.</p>
                <Button as={Link} to="/catalogo" variant="primary">Ver catálogo completo</Button>
            </div>
            
            <h2 className="mb-4">Libros Destacados</h2>
            <Row>
                {librosDestacados.map((libro) => (
                    <Col key={libro.id} md={4} className="mb-4">
                        <LibroCard {...libro} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
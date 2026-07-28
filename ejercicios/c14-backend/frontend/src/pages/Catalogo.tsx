import { Container, Row, Col } from 'react-bootstrap';
import { LibroCard } from '../components/LibroCard';
import type { LibroCardProps } from '../types/LibroCardProps';

type Props = {
    libros: LibroCardProps[];
};

export function Catalogo({ libros }: Props) {
    return (
        <Container>
            <h2 className="text-center mb-4">Catálogo Completo</h2>
            <Row>
                {libros.map((libro) => (
                    <Col key={libro.id} md={4} className="mb-4">
                        <LibroCard {...libro} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
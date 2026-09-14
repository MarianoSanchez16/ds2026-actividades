import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { apiFetch } from '../../services/api';
import type { Libro } from '../../types/libro';

export default function Catalogo() {
    const [libros, setLibros] = useState<Libro[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function cargarCatalogo() {
            try {
                setCargando(true);
                // Consumimos el endpoint real de Express
                const data = await apiFetch<Libro[]>('/libros');
                setLibros(data);
            } catch (err: any) {
                setError(err.message || 'Error al cargar los libros');
            } finally {
                setCargando(false);
            }
        }
        cargarCatalogo();
    }, []);

    if (cargando) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="my-5">
                <Alert variant="danger" className="text-center">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <h1 className="mb-4">Catálogo de Libros</h1>
            <Row>
                {libros.map((libro) => (
                    <Col key={libro.id} md={4} className="mb-4">
                        <Card className="h-100 shadow-sm">
                            <Card.Img variant="top" src={libro.imagen} alt={libro.titulo} style={{ height: '250px', objectFit: 'cover' }} />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{libro.titulo}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {libro.autor ? libro.autor.nombre : `Autor #${libro.autorId}`}
                                </Card.Subtitle>
                                <Card.Text className="fw-bold fs-5 mt-auto">${libro.precio}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { LibroCardProps } from '../types/libroCardProps';

export function LibroCard({ id, titulo, autor, precio, imagen }: LibroCardProps) {
    const [likes, setLikes] = useState<number>(0);

    return (
    <Card className="h-100 shadow-sm">
        <Card.Img variant="top" src={imagen} alt={`Portada de ${titulo}`} />
        <Card.Body className="d-flex flex-column">
        <Card.Title>{titulo}</Card.Title>
        <Card.Text className="text-muted mb-1">{autor}</Card.Text>
        <Card.Text className="text-primary fw-bold mb-3">${precio}</Card.Text>
        
        <div className="mt-auto d-flex justify-content-between align-items-center">
            <Button as={Link} to={`/libros/${id}`} variant="outline-primary">Ver más</Button>
            <Button variant="light" onClick={() => setLikes(likes + 1)}>
            {likes > 0 ? "❤" : "🤍"} {likes}
            </Button>
        </div>
        </Card.Body>
    </Card>
    );
}
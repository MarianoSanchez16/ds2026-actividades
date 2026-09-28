import { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../services/api';

export default function LibroNuevo() {
    const [titulo, setTitulo] = useState('');
    const [precio, setPrecio] = useState<number>(0);
    const [imagen, setImagen] = useState('');
    const [autorId, setAutorId] = useState<number>(1);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await apiFetch('/libros', {
                method: 'POST',
                body: JSON.stringify({ titulo, precio, imagen, autorId }),
            });

            navigate('/catalogo');
        } catch (err: any) {
            setError(err.message); // Captura los errores 401, 403 o 400 del Backend
        }
    };

    return (
        <Container className="my-5" style={{ maxWidth: '500px' }}>
            <Card className="shadow-sm p-4">
                <h2 className="mb-4">Nuevo Libro (ADMIN)</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Título</Form.Label>
                        <Form.Control type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Precio ($)</Form.Label>
                        <Form.Control type="number" value={precio} onChange={(e) => setPrecio(Number(e.target.value))} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>URL de Imagen</Form.Label>
                        <Form.Control type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>ID de Autor</Form.Label>
                        <Form.Control type="number" value={autorId} onChange={(e) => setAutorId(Number(e.target.value))} required />
                    </Form.Group>
                    <Button variant="success" type="submit" className="w-100">
                        Guardar Libro
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}
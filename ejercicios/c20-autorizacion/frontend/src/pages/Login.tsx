import { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';

const loginSchema = z.object({
    email: z.string().min(1, 'El email es requerido').email('Email inválido'),
    password: z.string().min(1, 'La contraseña es requerida'),
});

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const validacion = loginSchema.safeParse({ email, password });
        if (!validacion.success) {
            setError(validacion.error.errors.message);
            return;
        }

        try {
            await login({ email, password });
            navigate('/catalogo');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <Container className="my-5" style={{ maxWidth: '420px' }}>
            <Card className="shadow-sm p-4">
                <h2 className="text-center mb-4">Iniciar Sesión</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        Ingresar
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}

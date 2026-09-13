import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { libroSchema } from '../types/libroSchema';
import type { LibroValidado } from '../types/libroSchema';

type Props = {
    onAgregar: (libro: LibroValidado) => void;
};

export function LibroNuevo({ onAgregar }: Props) {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<LibroValidado>({
        resolver: zodResolver(libroSchema)
    });

    const onSubmit = (data: LibroValidado) => {
        onAgregar(data);
        navigate('/catalogo');
    };

    return (
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
            <h2 className="mb-4">Nuevo Libro</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Título</Form.Label>
                    <Form.Control {...register('titulo')} isInvalid={!!errors.titulo} />
                    <Form.Control.Feedback type="invalid">{errors.titulo?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Autor</Form.Label>
                    <Form.Control {...register('autor')} isInvalid={!!errors.autor} />
                    <Form.Control.Feedback type="invalid">{errors.autor?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" {...register('precio')} isInvalid={!!errors.precio} />
                    <Form.Control.Feedback type="invalid">{errors.precio?.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>URL de Imagen</Form.Label>
                    <Form.Control {...register('imagen')} isInvalid={!!errors.imagen} />
                    <Form.Control.Feedback type="invalid">{errors.imagen?.message}</Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" variant="primary">Agregar libro</Button>
            </Form>
        </div>
    );
}
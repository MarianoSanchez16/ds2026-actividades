import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LibroCard } from '../components/LibroCard';

export function Home() {
    const librosDestacados = [
    { id: 1, titulo: "Ficciones", autor: "Jorge Luis Borges", precio: 15000, imagen: "https://picsum.photos/300/400?random=1" },
    { id: 2, titulo: "1984", autor: "George Orwell", precio: 18000, imagen: "https://picsum.photos/300/400?random=2" },
    { id: 3, titulo: "Rayuela", autor: "Julio Cortázar", precio: 22000, imagen: "https://picsum.photos/300/400?random=3" }
    ];

    return (
    <>
    <header className="text-white text-center py-5 rounded mb-4" style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' }}>
        <Container>
            <h1 className="display-4 fw-bold">Bienvenido a Mi Librería</h1>
            <p className="lead">Descubre mundos increíbles en nuestra colección de libros seleccionados.</p>
            <Button as={Link} to="/catalogo" variant="light" size="lg" className="mt-3">Ir al Catálogo</Button>
        </Container>
    </header>

    <main>
        <h2 className="text-center mb-4">Libros Destacados</h2>
        <Row xs={1} md={3} className="g-4">
            {librosDestacados.map((libro) => (
            <Col key={libro.id}>
                <LibroCard 
                id={libro.id}
                titulo={libro.titulo} 
                autor={libro.autor} 
                precio={libro.precio} 
                imagen={libro.imagen} 
                />
            </Col>
            ))}
        </Row>
    </main>
    </>
    );
}
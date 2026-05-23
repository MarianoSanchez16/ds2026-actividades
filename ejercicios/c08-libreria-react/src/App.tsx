import { useState } from 'react';
import { Navbar, Container, Nav, Card, Button, Row, Col } from 'react-bootstrap';

//Componente Navbar
function NavbarLibreria(){
  return (
    <Navbar bg="light" expand="lg" className="border-bottom">
      <Container fluid>
        <Navbar.Brand href="#home">Mi librería</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="active">Inicio</Nav.Link>
            <Nav.Link href="#catalogo">Catálogo</Nav.Link>
            <Nav.Link href="#contacto">Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

//Componente Hero
function Hero(){
  return (
    <header className="text-white text-center py-5" style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'}}>
      <Container className="my-5">
        <h1 className="display-4 fw-bold">Bienvenido a mi librería</h1>
        <p className="lead">Todo lo que querés leer, organizado en un solo lugar.</p>
        <Button variant="light" size="lg" className="mt-3">Ir al Catálogo</Button>
      </Container>
    </header>
  );
}

//Componente reutilizable para la Card de libros
type LibroCardProps = {
  titulo: string;
  autor: string;
  precio: number;
  imagen: string;
};

function LibroCard({ titulo, autor, precio, imagen }: LibroCardProps){
  const [likes, setLikes] = useState<number>(0);

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={imagen} alt={`Portada de ${titulo}`} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{titulo}</Card.Title>
        <Card.Text className="text-muted mb-1">{autor}</Card.Text>
        <Card.Text className="text-primary fw-bold mb-3">${precio}</Card.Text>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Button variant="outline-primary">Ver más</Button>

          <Button variant="light" onClick={() => setLikes(likes + 1)}>
            {likes > 0 ? "❤" : "🤍"} {likes}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

//Componente de la app

export default function App(){
  const librosDestacados = [
    { id: 1, titulo: "Ficciones", autor: "Jorge Luis Borges", precio: 15000, imagen: "https://acdn-us.mitiendanube.com/stores/001/542/126/products/9789875666474-9169a61b8a651143a816944491431237-1024-1024.webp" },
    { id: 2, titulo: "1984", autor: "George Orwell", precio: 18000, imagen: "https://acdn-us.mitiendanube.com/stores/001/542/126/products/9789875669284-3ad1b3b3afa33e6cb016944487223033-480-0.webp" },
    { id: 3, titulo: "Rayuela", autor: "Julio Cortázar", precio: 22000, imagen: "https://acdn-us.mitiendanube.com/stores/001/542/126/products/9789877252538-8a4d6e142eeef3ac1a16944487744912-1024-1024.webp" },
    { id: 4, titulo: "El Aleph", autor: "Jorge Luis Borges", precio: 14500, imagen: "https://acdn-us.mitiendanube.com/stores/001/542/126/products/9789500755764-1c4d7808f950f6462017545035385073-480-0.webp" },
    { id: 5, titulo: "Cien Años de Soledad", autor: "Gabriel García Márquez", precio: 19000, imagen: "https://acdn-us.mitiendanube.com/stores/001/542/126/products/9788466379717-fd7367095ea0d310ca17592780412062-480-0.webp" },
    { id: 6, titulo: "Fahrenheit 451", autor: "Ray Bradbury", precio: 16000, imagen: "https://acdn-us.mitiendanube.com/stores/001/542/126/products/97898756611961-e662ea4ba6ce1283e816715571792633-480-0.webp" }
  ];

  return (
    <>
      <NavbarLibreria />
      <Hero />

      <main className="container my-5">
        <h2 className="text-center mb-4">Libros destacados</h2>

        <Row xs={1} md={3} className="g-4">
          {librosDestacados.map((libro) => (
            <Col key={libro.id}>
              <LibroCard
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
  )
}

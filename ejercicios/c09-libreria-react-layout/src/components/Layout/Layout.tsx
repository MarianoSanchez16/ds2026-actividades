import { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';

export function Layout({ children }: { children: ReactNode }) {
    return (
    <div className="d-flex flex-column min-vh-100">
        <Header />
        <Container className="py-4 flex-grow-1">
            {children}
        </Container>
        <Footer />
    </div>
    );
}
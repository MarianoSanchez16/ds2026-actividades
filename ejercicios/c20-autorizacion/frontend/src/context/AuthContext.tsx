import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiFetch } from '../services/api';

export interface Usuario {
    id: number;
    email: string;
    nombre: string;
    rol: 'ADMIN' | 'CLIENTE';
}

interface AuthContextType {
    usuario: Usuario | null;
    cargando: boolean;
    login: (datos: { email: string; password: string }) => Promise<void>;
    logout: () => void;
    estaAutenticado: () => boolean;
    tieneRol: (rol: 'ADMIN' | 'CLIENTE') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [cargando, setCargando] = useState(true);

    const logout = () => {
        localStorage.removeItem('token');
        setUsuario(null);
    };

    useEffect(() => {
        async function rehidratar() {
            const token = localStorage.getItem('token');
            if (!token) {
                setCargando(false);
                return;
            }

            try {
                const datosUsuario = await apiFetch<Usuario>('/auth/yo');
                setUsuario(datosUsuario);
            } catch {
                logout();
            } finally {
                setCargando(false);
            }
        }

        rehidratar();

        const manejarSesionExpirada = () => logout();
        window.addEventListener('sesion-expirada', manejarSesionExpirada);
        return () => window.removeEventListener('sesion-expirada', manejarSesionExpirada);
    }, []);

    const login = async (datos: { email: string; password: string }) => {
        const respuesta = await apiFetch<{ token: string; usuario: Usuario }>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(datos),
        });

        localStorage.setItem('token', respuesta.token);
        setUsuario(respuesta.usuario);
    };

    const estaAutenticado = () => !!usuario;
    const tieneRol = (rol: 'ADMIN' | 'CLIENTE') => usuario?.rol === rol;

    return (
        <AuthContext.Provider value={{ usuario, cargando, login, logout, estaAutenticado, tieneRol }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
    }
    return context;
}
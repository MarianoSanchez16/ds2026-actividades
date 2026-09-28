const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export class ApiError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.name = 'ApiError';
    }
}

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('token');

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        const mensaje = errorBody?.error || `Error HTTP ${res.status}`;
        
        if (res.status === 401 && token) {
            window.dispatchEvent(new CustomEvent('sesion-expirada'));
        }

        throw new ApiError(mensaje, res.status);
    }

    if (res.status === 204) {
        return {} as T;
    }

    return res.json();
}
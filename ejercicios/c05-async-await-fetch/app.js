"use strict";
async function obtenerUsuarios() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const usuarios = await response.json();
        return usuarios;
    }
    catch (error) {
        console.error('Erro al obtener los usuarios:', error);
        return [];
    }
}
async function iniciarApp() {
    const listaUsuarios = await obtenerUsuarios();
    for (const usuario of listaUsuarios) {
        console.log(`Nombre: ${usuario.name} | Email: ${usuario.email}`);
    }
}
iniciarApp();

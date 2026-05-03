"use strict";
const listaElement = document.querySelector('#listaUsuarios');
const cargandoElement = document.querySelector('#cargando');
const errorElement = document.querySelector('#error');
async function renderizarUsuarios() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const usuarios = await response.json();
        cargandoElement.style.display = 'none';
        for (const usuario of usuarios) {
            const liElement = document.createElement('li');
            liElement.textContent = `${usuario.name} - ${usuario.email}`;
            listaElement.appendChild(liElement);
        }
    }
    catch (error) {
        console.error('Error al obtener los usuarios:', error);
        cargandoElement.style.display = 'none';
        errorElement.textContent = 'Error: No se pudieron cargar los usuarios.';
        errorElement.style.display = 'block';
    }
}
renderizarUsuarios();

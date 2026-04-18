const inputElement = document.querySelector('#inputProducto');
const botonAgregar = document.querySelector('#botonAgregar');
const listaElement = document.querySelector('#listaProductos');
const contadorElement = document.querySelector('#contador');

let cantidadProductos = 0;

botonAgregar.addEventListener('click', () => {
    const nombreProducto = inputElement.value;

    if (nombreProducto === ""){
        alert("Error: ingresar el nombre de un producto válido");
        return;
    }
    const liElement = document.createElement('li');
    liElement.textContent = nombreProducto + " ";

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = "Eliminar";

    liElement.appendChild(botonEliminar);

    listaElement.appendChild(liElement);

    cantidadProductos++;
    contadorElement.textContent = `${cantidadProductos} productos en la lista`;
    inputElement.value = "";

    botonEliminar.addEventListener('click', () => {
        listaElement.removeChild(liElement);
        cantidadProductos--;
        contadorElement.textContent = `${cantidadProductos} productos en la lista`;
    })
})

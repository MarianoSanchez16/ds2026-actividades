const inputElement = document.querySelector('#inputAltura');
const botonElement = document.querySelector('#botonGenerar');
const resultadoElement = document.querySelector('#resultado');

botonElement.addEventListener('click', () => {
    const valorInput = inputElement.value;
    const altura = Number(valorInput);

    if (valorInput === "" || altura < 1){
        resultadoElement.textContent = "Error: ingresar un número mayor o igual a 1"
        return;
    }

    let arbol = "";
    for (let i = 1; i <= altura; i++){
        let fila = "";
        for (let j=0; j<i; j++){
            fila += "*";
        }
        arbol += fila + "\n";
    }
    resultadoElement.textContent = arbol;
});

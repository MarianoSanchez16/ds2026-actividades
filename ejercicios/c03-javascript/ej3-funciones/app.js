function calcularPrecioFinal(monto, medioPago){
    let montoFinal=monto;
    if (medioPago=='E'){
        medioPago='Efectivo';
    }
    else if (medioPago=='D'){
        medioPago='Débito';
    }
    else if (medioPago=='C'){
        medioPago='Crédito';
    }
    else {
        console.log("Error, no es un medio de pago válido");
        return "Error";
    }

    if (monto>=200 && monto<=400){
        switch (medioPago) {
            case "Efectivo":
                montoFinal=monto-monto*0.3;
                break;
            case "Débito":
                montoFinal=monto-monto*0.2;
                break;
            case "Crédito":
                montoFinal=monto-monto*0.1;
                break;
        }
    } 
    else if (monto>400){
        montoFinal=monto-monto*0.4;
    }
    console.log(`Monto: $${monto} | Pago: ${medioPago} | Final: $${montoFinal}`)
    return montoFinal;
}

//Ejemplos
calcularPrecioFinal(199, "E");
calcularPrecioFinal(199, "D");
calcularPrecioFinal(199, "C");
calcularPrecioFinal(199, "H");
calcularPrecioFinal(205, "E");
calcularPrecioFinal(205, "D");
calcularPrecioFinal(205, "C");
calcularPrecioFinal(205, "H");
calcularPrecioFinal(493, "E");
calcularPrecioFinal(493, "D");
calcularPrecioFinal(493, "C");
calcularPrecioFinal(493, "H");

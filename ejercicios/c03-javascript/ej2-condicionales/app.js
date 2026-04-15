function clasificarNota(nota){
    let resultado;
    if (nota<4){
        resultado="Desaprobado";
    }
    else if (nota>=4 && nota<8){
        resultado="Aprobado";
    } else {
        resultado="Promocionado";
    }
    return resultado;
}

// Ejemplos
console.log(clasificarNota(3));
console.log(clasificarNota(5))
console.log(clasificarNota(9))

function diaDeLaSemana(numero){
    let dia="";
    switch (numero) {
        case 1:
            dia="Lunes";
            break;
        case 2:
            dia="Martes";
            break;
        case 3:
            dia="Miércoles";
            break;
        case 4:
            dia="Jueves";
            break;
        case 5:
            dia="Viernes";
            break;
        case 6:
            dia="Sábado (fin de semana)";
            break;
        case 7:
            dia="Domingo (fin de semana)";
            break;
        default:
            dia="Día inválido";
    }
    return dia;
}

// Ejemplos

console.log(diaDeLaSemana(4))
console.log(diaDeLaSemana(6))
console.log(diaDeLaSemana(2))
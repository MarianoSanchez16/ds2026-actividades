const numeros = [125, 22, 34, 41, 5, 96, 73, 38, 29];

let suma = 0;
let mayor = numeros[0];
let menor = numeros[0];

for (const numero of numeros){
    suma = suma + numero;
    if (numero >= mayor){
        mayor = numero;
    }
    if (numero <= menor){
        menor = numero;
    }
}

let promedio = suma / numeros.length;
console.log(`La suma total es ${suma}`);
console.log(`El promedio es ${promedio}`);
console.log(`El número mayor del array es ${mayor}`);
console.log(`El número menor del array es ${menor}`);


function generarAsteriscos(n){
    let asteriscos="";
    for (let i=0; i<n; i++){
        asteriscos = asteriscos + '*';
    }
    console.log(asteriscos);
}

generarAsteriscos(3);
generarAsteriscos(12);
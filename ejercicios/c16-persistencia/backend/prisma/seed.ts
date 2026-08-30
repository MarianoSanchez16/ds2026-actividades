import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
    await prisma.libro.deleteMany();
    await prisma.autor.deleteMany();

    await prisma.autor.createMany({
        data: [
            { nombre: "Jorge Luis Borges", nacionalidad: "Argentino" },
            { nombre: "George Orwell", nacionalidad: "Británico" },
            { nombre: "Julio Cortázar", nacionalidad: "Argentino" }
        ]
    });

    await prisma.libro.createMany({
        data: [
            { 
                titulo: "Ficciones", 
                autor: "Jorge Luis Borges", 
                precio: 15000, 
                imagen: "https://acdn-us.mitiendanube.com/stores/001/542/126/products/9789875666474-1024-1024.webp", 
                disponible: true 
            },
            {
                titulo: "1984", 
                autor: "George Orwell", 
                precio: 18000, 
                imagen: "https://acdn-us.mitiendanube.com/stores/001/542/126/products/9789875669284-480-0.webp", 
                disponible: false 
            },
            { 
                titulo: "Rayuela", 
                autor: "Julio Cortázar", 
                precio: 22000, 
                imagen: "https://acdn-us.mitiendanube.com/stores/001/542/126/products/9789877252538-1024-1024.webp", 
                disponible: true 
            }
        ]
    });

    console.log("¡Base de datos sembrada con éxito!");
}

main()
    .catch((e) => {
    console.error("Error al sembrar la base de datos:", e);
    process.exit(1);
    })
    .finally(async () => {
    await prisma.$disconnect();
    });
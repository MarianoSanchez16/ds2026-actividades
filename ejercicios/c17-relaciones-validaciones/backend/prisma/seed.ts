import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
    await prisma.libro.deleteMany();
    await prisma.autor.deleteMany();
    await prisma.categoria.deleteMany();

    const terror = await prisma.categoria.create({ data: { nombre: "Terror" } });
    const ficcion = await prisma.categoria.create({ data: { nombre: "Ciencia Ficción" } });
    const realismo = await prisma.categoria.create({ data: { nombre: "Realismo" } });

    const borges = await prisma.autor.create({ data: { nombre: "Jorge Luis Borges", nacionalidad: "Argentino" } });
    const orwell = await prisma.autor.create({ data: { nombre: "George Orwell", nacionalidad: "Británico" } });
    const cortazar = await prisma.autor.create({ data: { nombre: "Julio Cortázar", nacionalidad: "Argentino" } });

    await prisma.libro.create({
        data: {
            titulo: "Ficciones",
            precio: 15000,
            imagen: "https://acdn-us.mitiendanube.com/stores/001/542/126/products/9789875666474-1024-1024.webp",
            disponible: true,
            autor: { connect: { id: borges.id } },
            categorias: { connect: [{ id: ficcion.id }] }
        }
    });

    await prisma.libro.create({
        data: {
            titulo: "1984",
            precio: 18000,
            imagen: "https://acdn-us.mitiendanube.com/stores/001/542/126/products/9789875669284-480-0.webp",
            disponible: false,
            autor: { connect: { id: orwell.id } },
            categorias: { connect: [{ id: ficcion.id }, { id: terror.id }] }
        }
    });

    await prisma.libro.create({
        data: {
            titulo: "Rayuela",
            precio: 22000,
            imagen: "https://acdn-us.mitiendanube.com/stores/001/542/126/products/9789877252538-1024-1024.webp",
            disponible: true,
            autor: { connect: { id: cortazar.id } },
            categorias: { connect: [{ id: realismo.id }] }
        }
    });

    console.log("Base de datos relacional sembrada con éxito");
}

main()
    .catch((e) => {
        console.error("Error al poblar la base de datos:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
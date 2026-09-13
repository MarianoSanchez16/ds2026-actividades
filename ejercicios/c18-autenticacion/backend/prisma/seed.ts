import bcrypt from 'bcrypt';
import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

async function main() {
    await prisma.libro.deleteMany();
    await prisma.autor.deleteMany();
    await prisma.categoria.deleteMany();
    await prisma.usuario.deleteMany();

    const passwordAdminHash = await bcrypt.hash('Admin1234', SALT_ROUNDS);
    const passwordClienteHash = await bcrypt.hash('Cliente1234', SALT_ROUNDS);

    await prisma.usuario.create({
        data: {
            nombre: 'Administrador General',
            email: 'admin@libreria.test',
            passwordHash: passwordAdminHash,
            rol: 'ADMIN',
        },
    });

    await prisma.usuario.create({
        data: {
            nombre: 'Juan Pérez',
            email: 'cliente@libreria.test',
            passwordHash: passwordClienteHash,
            rol: 'CLIENTE',
        },
    });

    const ficcion = await prisma.categoria.create({ data: { nombre: 'Ciencia Ficción' } });
    const borges = await prisma.autor.create({ data: { nombre: 'Jorge Luis Borges', nacionalidad: 'Argentino' } });

    await prisma.libro.create({
        data: {
            titulo: 'Ficciones',
            precio: 15000,
            imagen: 'https://ejemplo.com/ficciones.webp',
            disponible: true,
            autor: { connect: { id: borges.id } },
            categorias: { connect: [{ id: ficcion.id }] },
        },
    });

    console.log('Base de datos sembrada con éxito con usuarios ADMIN y CLIENTE.');
}

main()
  .catch((e) => {
    console.error('Error al poblar la base de datos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
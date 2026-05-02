interface Usuario {
    id: number;
    name: string;
    email: string;
    phone: string;
}

async function obtenerUsuarios(): Promise<Usuario[]> {
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok){
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const usuarios: Usuario[] = await response.json();

        return usuarios;
    } catch(error){
        console.error('Erro al obtener los usuarios:', error);
        return [];
    }
}

async function iniciarApp(){
    const listaUsuarios = await obtenerUsuarios();

    for (const usuario of listaUsuarios){
        console.log(`Nombre: ${usuario.name} | Email: ${usuario.email}`);
    }
}

iniciarApp();
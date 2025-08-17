//importando pacote e dependencias do framework
import fastify from "fastify";
import { request } from "http";

//criando o servidor com log ativo
const server = fastify({ logger: true} );

const teams = [
    { id: 1, name: 'Mc Laren', base: 'Woking, UK' },
    { id: 2, name: 'Mercedes', base: 'Brackley, UK' },
    { id: 3, name: 'Redbull Racing', base: 'Milton Keynes, UK' }
];

const drivers = [
    { id: 1, driver1: 'Lando Norris', driver2: 'Oscar Piastri', team: 'Mc Laren'},
    { id: 2, driver1: 'Andrea Kimi Antonelli', driver2: 'George Russel', team: 'Mercedes'},
    { id: 3, driver1: 'Max Verstappen', driver2: 'Liam Lawson', team: 'Redbull Racing'}
];

//configurar protocolo http e método get
server.get('/teams', async (request, response) => {

    //criando controller
    response.type('application/json').code(200);
    return { teams };

});

interface DriverParams {
    id: string;
}

server.get('/drivers', async (request, response) => {
    response.type('application.json').code(200);
    return { drivers };
});

//filtrando pilotos
server.get<{Params: DriverParams}>('/drivers/:id', async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find( d => d.id === id);

    if(!driver){
        response.type('application.json').code(404);
        return { message: "Driver do not found" };
    } else {
        response.type('application.json').code(200);
        return { driver };
    }
}
);

//criando porta de escuta
server.listen({ port: 3333 }, () => {
    console.log('server init');
});
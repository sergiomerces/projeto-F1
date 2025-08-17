//importando pacote e dependencias do framework
import fastify from "fastify";
import { request } from "http";

//criando o servidor com log ativo
const server = fastify({ logger: true} );

const teams = [
{ id: 1, name: 'McLaren', base: 'Woking, UK' },
{ id: 2, name: 'Mercedes', base: 'Brackley, UK' },
{ id: 3, name: 'Red Bull Racing', base: 'Milton Keynes, UK' },
{ id: 4, name: 'Ferrari', base: 'Maranello, Italy' },
{ id: 5, name: 'Aston Martin', base: 'Silverstone, UK' },
{ id: 6, name: 'Alpine', base: 'Enstone, UK' },
{ id: 7, name: 'Williams', base: 'Grove, UK' },
{ id: 8, name: 'Sauber', base: 'Hinwil, Switzerland' },
{ id: 9, name: 'Haas F1 Team', base: 'Kannapolis, USA' },
{ id: 10, name: 'Racing Bulls', base: 'Faenza, Italy' }
];

const drivers = [
{ id: 1, driver1: 'Lando Norris', driver2: 'Oscar Piastri', team: 'McLaren' },
{ id: 2, driver1: 'Andrea Kimi Antonelli', driver2: 'George Russell', team: 'Mercedes' },
{ id: 3, driver1: 'Max Verstappen', driver2: 'Liam Lawson', team: 'Red Bull Racing' },
{ id: 4, driver1: 'Charles Leclerc', driver2: 'Lewis Hamilton', team: 'Ferrari' },
{ id: 5, driver1: 'Fernando Alonso', driver2: 'Lance Stroll', team: 'Aston Martin' },
{ id: 6, driver1: 'Pierre Gasly', driver2: 'Jack Doohan', team: 'Alpine' },
{ id: 7, driver1: 'Alexander Albon', driver2: 'Carlos Sainz', team: 'Williams' },
{ id: 8, driver1: 'Nico Hulkenberg', driver2: 'Gabriel Bortoleto', team: 'Sauber' },
{ id: 9, driver1: 'Esteban Ocon', driver2: 'Oliver Bearman', team: 'Haas F1 Team' },
{ id: 10, driver1: 'Yuki Tsunoda', driver2: 'Isack Hadjar', team: 'Racing Bulls' }
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
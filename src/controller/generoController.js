import express, {Router, request, response} from 'express'
import service from '../services/generoService.js'


const routes = express.Router()

routes.get('/',  async (request, response) => {
    const generoSaves = await service.listUser();

    if(generoSaves.length < 1){
        return response.status(401).end();
    }
    response.status(200).send({message: generoSaves})
});

routes.post('/', async (request, response) => {
    const {genero} = request.body;

    if(genero == ""){
        return response.status(400).send({message: "O genero não foi informado!"})
    }

    await service.createGenero(genero)

    return response.status(203).send({message: "Gênero cadastrado!"})
});

routes.put('/', async (request, response) =>{
    const{id_genero, genero} = request.body;

    if(genero.length < 1){
        return response.status(400).send({message: "Gênero não pode ser nulo"});
    }

    if(id_genero.length < 1){
        return response.status(400).send({message: "o ID do gênero não pode ser nulo"});
    }

    await service.updateUser(id_genero, genero);

    return response.status(200).send({message: "Gênero cadastrado com sucesso"});
    
    
});

routes.delete("/: id_genero", async(request, response) =>{
    const{id_genero} = request.params;
    if(id_genero == null){
        return response.status(400).send({message: "ID não informado pelo usuário"})
    }
    await response.status(200).send({message: "Gênero deletado com sucesso!"})
});

export default routes
import express, { request, response } from 'express'
import service from '../services/atorService.js'
import res from 'express/lib/response.js';



const routes = express.Router()

routes.get('/',  async (request, response) => {
    const atorSaves = await service.listUser();

    if(atorSaves.length < 1){
        return response.status(401).end();
    }
    response.status(200).send({message: atorSaves})
});

routes.post('/', async (request, response) => {
    const {nome_ator , sexo, dt_nascimento} = request.body;

    if(nome_ator == ""){
        return response.status(400).send({message: "O nome do ator não foi informado!"})
    }

    if(sexo != "M" || sexo != 'F'){
        return response.status(400).send({message: "Informe o sexo do ator corretamente!"})
    }

    if(dt_nascimento == "" || dt_nascimento.length != 10){
        return response.status(400).send({message: "Informe uma data valida!"})
    }

    await service.createActor(nome_ator, sexo, dt_nascimento)

    return response.status(203).send({message: "Ator cadastrado!"})
});

routes.put('/', async (request, response) =>{
    const{id_ator, nome_ator, sexo, dt_nascimento} = request.body;
    if(nome_ator < 1 ){
        return response.status(400).send({message: " Ator não pode ser nulo"});
    }
    if(id_ator < 1 ){
        return response.status(400).send({message: " ID do ator não pode ser nulo"});
    }
    if(sexo < 1 ){
        return response.status(400).send({message: " sexo do ator não pode ser nulo"});
    }
    if(dt_nascimento < 1 ){
        return response.status(400).send({message: " A data de nascimento do ator não pode ser nulo"});
    }
    await service.updateActor(id_ator, nome_ator, sexo, dt_nascimento);
    
    return response.status(200).send({message: "Ator cadastrado com sucesso!"})
});

routes.delete("/id_ator", async(request, response) =>{
    const{id_ator} = request.params;
    if(id_ator == null){
        return response.status(400).send({message: "ID não informado pelo usuário"});
    }
    await service.deleteActor(id_ator);
    return response.status(200).send({message: "Ator deletado com sucesso!"})
});

export default routes


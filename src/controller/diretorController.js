import express, { request, response } from 'express'
import service from '../services/diretorService.js'


const routes = express.Router()

routes.get('/', async (request, response) => {
    const directorSaves = await service.listDirector();

    if(directorSaves.length < 1){
        return response.status(401).end();
    }
    response.status(200).send({message: directorSaves})
});

routes.post('/', async (request, response) => {
    const {nomeDiretor, nacionalidade, dtNascimento} = request.body;

    if(nomeDiretor == ""){
        return response.status(400).send({message: "O nome do diretor não foi informado!"})
    }

    if(nacionalidade == ""){
        return response.status(400).send({message: "A nacionalidade do diretor não foi informada!"})
    }

    if(dtNascimento == "" || dtNascimento.length != 10){
        return response.status(400).send({message: "Informe uma data valida!"})
    }

    await service.createDirector(nomeDiretor, nacionalidade, dtNascimento)

    return response.status(203).send({message: "Diretor cadastrado!"})
});

routes.put('/', async (request, response) => {
   const{id_diretor, nome_diretor, nacionalidade, dt_nascimento, sexo} = request.body;
   if(id_diretor < 1){
    return response.status(400).send({message: "Diretor não pode ser nulo"});
   }
   if(nome_diretor < 1){
    return response.status(400).send({message: "Nome do diretor não pode ser nulo"});
   }
   if(nacionalidade < 1){
    return response.status(400).send({message: "A nacionalidade não pode ser nula"});
   }
   if(dt_nascimento != int){
    return response.status(400).send({message: " O campo só pode conter números"});
   }
   if(sexo < 1){
    return response.status(400).send({message: "Informe o sexo do diretor"});
   }
   await service.updateDirector(id_diretor, nome_diretor, nacionalidade, dt_nascimento, sexo);

   return response.status(200).send({message: "Diretor cadastrado com sucesso"})
});

routes.delete("/id_diretor", async(request, response) => {
    const{id_diretor} = request.params;
    if(id_diretor == null){
        return response.status(400).send({message: "ID não informado pelo usuário"});
    }
    await service.deleteDirector(id_diretor);
    return response.status(200).send({message: "Diretor cadastrado com sucesso!"})
});

export default routes
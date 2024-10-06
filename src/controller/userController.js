import express from 'express'
import service from '../services/userService.js'
import { verifyToken } from '../middleware/jwt.js';

const routes = express.Router();

routes.get('/', verifyToken, async (request, response) => {
    const usersSaves = await service.listUser();

    if(usersSaves.length < 1){
        return response.status(401).end();
    }
    response.status(200).send({message: usersSaves})
});

routes.post('/',  async (request, response) => {
    const {email, senha , nome, tipoUsuario} = request.body;

    if(senha.length < 6){
        return response.status(400).send({message: "A senha deve possuir mais de 6 caracteres"})
    }

    await service.createUser(email, senha, nome, tipoUsuario)

    return response.status(203).send({message: "Usuario cadastrado!"})
});
 
routes.put('/', async (request, response) =>{
    const{email, password, name, typeUser, idUser} = request.body;

    if(email.length < 1){
        return response.status(400).send({message: "Email não pode ser nulo"});
    }
    if(!email.includes('@')){
        return response.status(400).send({message: "O email precisa conter @"});
    }
    await service.updateUser(email, password, name, typeUser, idUser);

    return response.status(200).send({message: "Usuário cadastrado com sucesso"});
});

routes.delete("/:idUser", async(request, response) =>{
    const{idUser} = request.params;
    if (idUser == null){
        return response.status(400).send({message: "ID não informado pelo usuário"});
    }
    await service.deleteUser(idUser);
    return response.status(200).send({message: "Usuário deletado com sucesso!"});
});

export default routes
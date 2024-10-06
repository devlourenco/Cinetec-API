import  express, { request, response }  from 'express'
import loginService from '../services/loginService.js';
import { createTokenJWT } from '../middleware/jwt.js';

const routes = express.Router();

routes.get('/', async (request, response) => {
    const loginSaves = await loginService.verifyLogin();

    if(loginSaves.length < 1){
        return response.status(401).end();
    }
    response.status(200).send({Message: verifyLogin})
});

routes.post('/', async (request, response) => {
    const{emailFront, senha} = request.body;

    const login = await loginService.verifyLogin(emailFront, senha)
    if(login.length < 1){
        return response.status(401).send({message: "Login Inválido"})
    }
    if(emailFront.length < 1){
        return response.status(400).send({Message: "O email não pode ser nulo"});
    }
    if(!emailFront.includes('@')){
        return response.status(400).send({Message:"O email deve conter @ em seu corpo"});
    }

    if(senha.length < 6){
        return response.status(400).send({Message: "A senha deve conter mais de 6 caracteres"});
    }

    const {id_usuario, nome, email, tipo_usuario} = login[0];
    
    const token = createTokenJWT(id_usuario, nome, email, tipo_usuario);

    return response.status(200).send({Message: token});
    
});


export default routes

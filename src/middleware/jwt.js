import { request, response } from 'express';
import jwt, { decode } from 'jsonwebtoken';

function createTokenJWT(id_usuario, nome, email, tipo_usuario) {

    const myKey = "Minh@ChaveCR!PTogr@Fada";

    const token = jwt.sign(
        {id_usuario, nome, email, tipo_usuario}, 
        myKey,
        {expiresIn: 60}
    );
    return token;
}

function verifyToken(request, response, next){
    const myKey = "Minh@ChaveCR!PTogr@Fada";

    const token = request.headers.authorization;

    jwt.verify(token, myKey, (error, decoded) => {
        if(error){
            return response.status(401).send({message: "Token Inválido. Usuário não autorizado"});
        }

        next();

    });


}

export {createTokenJWT, verifyToken};
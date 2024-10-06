import  Express from 'express';
import movieService from '../services/movieService.js';
import generoService from '../services/generoService.js';
import diretorService from '../services/diretorService.js';


const routes  = Express.Router();

routes.post('/', async(request, response) => {
    const {nameMovie, release, duration, nameGender, nameDirector} =  request.body;

    const genderData = await generoService.validateGenero(nameGender);
    const directorData =  await diretorService.validateDirector(nameDirector);
    
    if(genderData.length < 1) {
        return response.status(400).send({message: "Gênero informado é invalido"})
    };

    if(directorData.length < 1){
        return response.status(400).send({message:"Diretor informado é inválido!"})
    }
    const {id_genero} = genderData[0];
    const {id_diretor} = directorData[0]; 
    await movieService.createMovie(nameMovie, release, duration, id_diretor, id_genero);

    return response.status(200).send({message:"Filme cadastrado com sucesso!"})

});





export default routes;
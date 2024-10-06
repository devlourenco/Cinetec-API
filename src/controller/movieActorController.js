import express, {Router, request, response} from 'express'
import service from '../services/movieActorServices.js'
import movieService from '../services/movieService.js';
import atorService from '../services/atorService.js';

const routes = express.Router()

routes.get ('/', async (request, response) => {
    const MovieActorSaves = await service.listMovieActor();

    if(MovieActorSaves.length <1){
        return response.status(401).end();
    }
    response.status(200).send({message: MovieActorSaves})
});

routes.post('/', async(request, response) => {
    const {nameActor, nameMovie} = request.body;

    const movieData = await
    movieService.validateMovie(nome_filme);
    const actorData = await
    atorService.validateActor(nome_ator);

    if(movieData.length < 1){
        return response.status(400).send({message: "filme informado é invalido"})
    };
    if(actorData.length < 1){
        return response.status(400).send({message: "ator informado é invalido"})
    };
    const {nome_ator} = actorData[0];
    const {nome_filme} = movieData[0];
    await movieService.createMovie(nameMovie, release, duration);
    return response.status(200).send({message: "Filme cadastrado com sucesso!"})

 });

export default routes;
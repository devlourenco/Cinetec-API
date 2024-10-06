import express from 'express'
import { verifyToken } from './middleware/jwt.js'
import userController from './controller/userController.js'
import atorController from './controller/atorController.js'
import diretorController from './controller/diretorController.js'
import generoController from './controller/generoController.js'
import loginController from './controller/loginController.js'
import movieController from './controller/movieController.js'
import movieActorController from './controller/movieActorController.js'

const routes = express()

routes.use('/users', userController)
routes.use('/ator', verifyToken, atorController)
routes.use('/genero', verifyToken, generoController)
routes.use('/diretor', verifyToken, diretorController)
routes.use('/login',  loginController)
routes.use('/movie', verifyToken, movieController)
routes.use('/movieActor', verifyToken, movieActorController)

export default routes
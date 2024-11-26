import express from 'express'
import actorcontroller from './actorcontroller.js'

const actorRoutes = express.Router()

actorRoutes.post('/actor',actorcontroller.handleInsertActorRequest)
actorRoutes.get('/actores',actorcontroller.handleGetActoresRequest)
actorRoutes.get('/actor/:id',actorcontroller.handleGetActorByIdRequest)
actorRoutes.get('/actor/:pelicula',actorcontroller.handleGetActoresByPeliculaIdRequest)

export default actorRoutes
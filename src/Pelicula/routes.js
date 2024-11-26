import express from 'express'
import peliculacontroller from './peliculacontroller.js'

const peliculaRoutes =express.Router()

peliculaRoutes.post('/pelicula',peliculacontroller.handleInsertPeliculaRequest)
peliculaRoutes.get('/peliculas',peliculacontroller.handleGetPeliculasRequest)
peliculaRoutes.get('/pelicula/:id',peliculacontroller.handleGetPeliculaByIdRequest)
peliculaRoutes.put('/pelicula/:id',peliculacontroller.handleUpdatePeliculaByIdRequest)
peliculaRoutes.delete('/pelicula/:id',peliculacontroller.handleDeletePeliculaByIdRequest)

export default peliculaRoutes
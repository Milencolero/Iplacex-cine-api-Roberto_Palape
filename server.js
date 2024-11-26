import express, { urlencoded } from 'express'
import cors from 'cors'
import cliente from './src/common/db.js'
import peliculaRoutes from './src/Pelicula/routes.js'
import actorRoutes from './src/Actor/routes.js'


const PORTS = 3000 || 4000
const app = express ()

app.use (express.json())
app.use (urlencoded({extended:true}))
app.use(cors())

app.all('/',(req, res) => {return res.status(200).send('Bienvenido al cine Iplacex')}) 

app.use('/api',peliculaRoutes,actorRoutes)

await cliente.connect()
.then (() => {
    console.log('conectado al cluster')
    app.listen(PORTS, () =>{ console.log(`Servidor Corriendo en http://localhost:${PORTS}`)})
})
.catch (() =>{
    console.log('Ha occurido un problema al conectar al cluster de atlas')
})




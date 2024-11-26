import { ObjectId } from "mongodb";
import cliente from "../common/db.js";
import { pelicula } from "./pelicula.js";


const peliculaCollection = cliente.db('cine-db').collection('peliculas')

// insertar registros a la base datos //
async function handleInsertPeliculaRequest(req,res){
    let data = req.body
    let Pelicula =pelicula

    pelicula.nombre = data.nombre
    pelicula.generos = data.generos
    pelicula.anoEstreno = data.anoEstreno

    await peliculaCollection.insertOne(pelicula)
    .then((data) => {
        if(data == null) return res.status(400).send('Error al guardar registro')
        
        return res.status(201).send(data)
    })

    .catch((e) => { return res.status(500).send({error:e})})
}

// saber todos los registros //
async function handleGetPeliculasRequest(req, res){
    await peliculaCollection.find({}).toArray()
    .then ((data) => {return res.status(200).send(data)})
    .catch((e) => {return res.status(500).send({error: e})})

}

// obtener registro en base a ID //
async function handleGetPeliculaByIdRequest(req,res){
    let id = req.params.id

    try{
        let oid = ObjectId.createFromHexString(id)
        await peliculaCollection.findOne({_id:oid})
        .then((data) => {
            if(data === null) return res.status(404).send (data)
                return res.status(200).send(data)
        })
        .catch((e) => {
            return res.status(500).send({error:e.code})
        })
        } catch(e){
        return  res.status(400).send('ID MAL FORMADO')
    }
}

// Actualizar registro segun ID //
async function handleUpdatePeliculaByIdRequest(req,res){
    let id = req.params.id
    let pelicula = req.body

    try{
        let oid = ObjectId.createFromHexString(id)

        let query = { $set: pelicula}

        await peliculaCollection.updateOne({_id:oid}, query)
        .then((data) => {return res.status(200).send(data)})
        .catch((e) => { return res.status(500).send({code: e.code}) })

    }catch(e){
        return res.status(400).send('Id MAL FORMADO')
    }
}

// eliminar segun ID //
async function handleDeletePeliculaByIdRequest(req, res){
    let id = req.params.id

    try{
        let oid = ObjectId.createFromHexString(id)

        await peliculaCollection.deleteOne({_id: oid})
        .then ((data) => {return res.status(200).send(data) })
        .catch((e) => {return res.status(500).send({code: e.code})})
    }catch (e) {
        return res.status(400).send('ID MAL FORMADO')
    }
} 

export default {
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaByIdRequest,
    handleUpdatePeliculaByIdRequest,
    handleDeletePeliculaByIdRequest
}



import { ObjectId } from "mongodb";
import cliente from "../common/db.js";
import { actor } from "./actor.js";

const actorCollection = cliente.db('cine-db').collection('actores')

// insertar registros a la base datos //

    async function handleInsertActorRequest(req, res) {
    let data = req.body;
    let Actor = actor

   // con esto se busca la pelicula en "peliculas"
    try { 
        
        const pelicula = await peliculaCollection.findOne({ nombre: data.idPelicula });

        if (!pelicula) {
            return res.status(404).send('La película no está registrada');
        }

        // Asignamos los datos del actor
        actor.idPelicula = data.idPelicula;
        actor.nombre = data.nombre;
        actor.edad = data.edad;
        actor.estaRetirado = data.estaRetirado;
        actor.premios = data.premios;

        // Insertamos el actor en la base de datos
        const result = await actorCollection.insertOne(actor);

        if (!result) {
            return res.status(400).send('Error al guardar el registro');
        }

        return res.status(201).send(result);
    } catch (error) {
        return res.status(500).send({ error });
    }
}


// saber todos los registros //
async function handleGetActoresRequest(req, res){
    await actorCollection.find({}).toArray()
    .then ((data) => {return res.status(200).send(data)})
    .catch((e) => {return res.status(500).send({error: e})})

}


// obtener registro en base a ID //
async function handleGetActorByIdRequest(req,res){
    let id = req.params.id

    try{
        let oid = ObjectId.createFromHexString(id)
        await actorCollection.findOne({_id:oid})
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

// obtener registro en base a idPelicula //
async function handleGetActoresByPeliculaIdRequest(req,res){
    let id = req.params.id

    try{
        let oid = ObjectId.createFromHexString(id)
        await actorCollection.findOne({idPelicula:oid})
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


export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest

}
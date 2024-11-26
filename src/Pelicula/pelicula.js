import { BSONType, ObjectId } from "mongodb";

export const pelicula = {
    _id: ObjectId,
    nombre: BSONType.string,
    generos: BSONType.array,
    anoEstreno: BSONType.int
}
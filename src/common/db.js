import { MongoClient, ServerApiVersion } from "mongodb";

const uri = 'mongodb+srv://rpalape:9fWZiAomlqrcgxjr@eva-u3-express.o3apy.mongodb.net/?retryWrites=true&w=majority&appName=eva-u3-express'

const cliente = new MongoClient(uri,{
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }

})

export default cliente
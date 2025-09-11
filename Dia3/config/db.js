import mongoose from "mongoose";

export class Database{
    constructor(uri){
        this.uri=uri;
    }
    async connect(){
        try{
            mmongoose.set("strictQuery", true);
            await mongoose.connect(this.uri);
            console.log("MongoDB Conectado ")
        }catch(err){    
            console.log("Error de conexión " + err.message);
        }
    }

    async disconnect(){
        try{
            await mongoose.disconnect();
            console.log("Base de datos desconectada")
        }catch(err){
            console.log("Error de MongoDB " + err.message);
        }
    }
}
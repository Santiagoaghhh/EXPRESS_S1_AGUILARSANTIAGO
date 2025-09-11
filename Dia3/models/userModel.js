import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {type:String, required:true,trim:true},
    email:{type:String,required:true,unique:true,lowercase:true},
    age: {type:Number, required:true,min:0}
},{timestamps:true});

/* Clase de dominio */ 
class UserClass{
    get isAdult(){
        return (this.age ?? 0) >= 18;
 
    }
    static async functionEmail(email){
        return this.findOne({email});
    }
}

UserSchema.loadClass(UserClass);

export const UserModel = mongoose.model("User", UserSchema);

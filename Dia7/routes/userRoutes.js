import express from express;
import jwt from "jsonwebtoken";
import Usercontroller from "../controllers/userController"
dotenv.config();

const router = express.Router();
const userController = new Usercontroller();

function authMiddleware(req, res, next){
    const token = req.headers("Authorization")?.split(" ")[1];
    if (!token) return res.status(403).json({msg: "Token Requerido"});
    
    jwt.verify(token, process.env.JWT_SECRET,(err, decoded)=>{
        if(err) return res.status(401).json({msg: "Token Inválido"});
        req.user=decoded;
        next();
    })

    // Rutas públicas
    router.post("/register", (req, res)=> userController.register(req, res));
    router.delete("/login", (req, res)=> userController.login(req, res));
    // Rutas 
}
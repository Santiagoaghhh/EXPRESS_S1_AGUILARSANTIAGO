import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

export default class Usercontroller {
    constructor() {
        this.user = new UserModel();
    }
}


    async function register(req, res){
    try {
        const { name, email, password } = req.body;
        const existingUser = await this.UserModel.findUserByEmail(email);

        if (existingUser) {
            res.status(400).json({
                msg: "El usuario ya existe"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userModel.createUser({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({
            msg: "Usuario registrado exitosamente ", newUser
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

    async function login(req, res){
        try{
            const {email, password} = req.body;
            const existingUser = await this.userModel.findUserByIdEmail(email);

            if(!existingUser){
                return res.status(404).json({
                    msg: "El usuario no existe"
                });
            }
            
            const validPassword = await bcrypt.compare(password, existingUser.password)
            if (!validPassword){
                return res.status(401).json({
                    msg: "Contraseña Inváñoda"
                })
            }

            const token = jwt.sign({id:existingUser.id},  process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES})
            res.status(202).json({
                msg: "Login exitoso",
                token
            })
        }catch(err){
            res.status(500).json({error: err.message})
        }
    }

    async function updateUser(req, res){
        try{
            const {id} = req.user;
            const {name, email}=req.body;

            const hashedPassword = await bcrypt.hash(password, 10)
            await this.userModel.updateUser(id, {name, email});
            res.status(200).json({
                msg: "Usuario actualizado con éxito"
            });
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
}
import "dotenv/config";
import { Express } from "express";
import { Database } from "./config/db";

// Importación BBDD
import {UserModel} from "./config/db.js"

// Importación MVC
import {UserModel} from "./models/userModel.js"
import { UserRepository } from "./repositories/userRepository";
import { UserService } from "./services/userService";
import { UserController } from "./controllers/userController";
import { buildUserRouter } from "./routes/userRoutes";

class App{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.db = new Database(process.env.URI);
    }
    async init(){
        await this.db.connect;
        this.app.use(express.json());
        this.app.get("/", (req, res))=>
            res.json({
                ok:true,
                service:"Servicio de CRUD USUARIOs"
            })
    }
};

// Inyección de dependencias para User
const userRepo = new UserRepository(UserModel);

import { Express } from "express";
import dotenv from "dotenv";
import routes from "./routes/userRoutes.js"

dotenv.config();

const app = Express();
app.use(Express.json());

// Rutas principales
app.use('/api', routes);
const PORT = process.env.PORT;

app.listen(PORT)
// Requerir dotenv primero y jsonformat
require('dotenv').config();
const format = require('json-format');

// Requerir mongiito
const { MongoClient } = require('mongodb');
const URI = process.env.URI;
const DBNAME = process.env.DB_NAME;

let db;

async function connectDB() {
    const client = new MongoClient(URI);
    try {
        await client.connect();
        console.log("Conexion exitosa");
        db = client.db(DBNAME);
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1); // Salir si la conexión falla
    }
}

connectDB();

// Requerir express
const express = require('express');
const app = express();

// Definir puerto (con valor por defecto si no está en .env)
const PORT = process.env.PORT;

// Anidar a express con json
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.send('Servidor funcionando ✅');
});

// Escuchar el puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});





// Endpoint para agregar un camper
app.post('/crearCamper', async (req,res) => {
    try {
        // Obtener los datos del camper desde el cuerpo de la petición (req.body)
        const newCamper = {
          ID: req.body.ID,
          Nombres: req.body.Nombres,
          Apellidos: req.body.Apellidos,
          Direccion: req.body.Direccion,
          Acudiente: req.body.Acudiente,
          Telefono: req.body.Telefono,
          Estado: "En proceso de ingreso", // Estado inicial
          Ruta: "Sin asignar",
          Grupo: "Sin asignar",
          Notas: "Sin asignar",
          Horario: req.body.Horario,
        };
    
        // Obtener la colección de campers
        const collection = db.collection('campers');
    
        // Insertar el nuevo camper en la base de datos
        const result = await collection.insertOne(newCamper);
    
        // Enviar una respuesta de éxito
        res.status(201).json({
          message: 'Camper agregado exitosamente',
          camperId: result.insertedId,
          camper: newCamper
        });
    
      } catch (error) {
        console.error("Error al agregar el camper:", error);
        res.status(500).json({ message: 'Error interno del servidor al agregar el camper' });
      }
})

app.get('/listarCampers', async (req, res) => {
    try {
        // 1. Acceder a la colección 'campers'
        const collection = db.collection('campers');

        // 2. Usar 'find' con una proyección para mostrar solo ID y Nombres
        const listarCampers = await collection.find({}, {
          _id: 0,
          ID: 1,
          Nombres: 1
        }).toArray();

        // 3. Formatear la lista de campers para una visualización más legible
        const jsonFormateado = format(listarCampers);

        // 4. Enviar la cadena de texto formateada como respuesta
        res.status(200).send(jsonFormateado);
        
        console.log("Mostrando Listado de Campers");

    } catch (error) {
        console.error("Error al listar los campers:", error);
        res.status(500).json({ message: 'Error interno del servidor al listar los campers' });
    }
});


/*app.delete('/eliminarCamper', async (req,res) => {
    try{
        const collection = db.collection('campers');

        //2. Usar comando find 
        const listarCampers = await collection.find({},{ID:1,Nombres:1}).toArray();

        // 3. Enviar la lista de campers como respuesta en formato JSON
        const jsonFormateado = format(listarCampers);
        res.status(200).send(jsonFormateado);
    }
})
*/
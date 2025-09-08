// Requerir dotenv primero
require('dotenv').config();

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

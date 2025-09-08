// Para el uso de endpoints correctamente en la seccion de campers

// 1. Para agregar un camper
/*
curl -X POST -H "Content-Type: application/json" -d '{
    "ID": "101",
    "Nombres": "Juan",
    "Apellidos": "Pérez",
    "Direccion": "Calle 123",
    "Acudiente": "María Pérez",
    "Telefono": "123456789",
    "Horario": "Mañana"
  }' http://localhost:3000/crearCamper

*/

// 2. Para mostrar JSON Bonito de Campers (O cualquier array)
//  2.1 Instalar json-format -> npm i json-format
//  2.2 Requerir json format ->  const format = require('json-format');
//  2.3  Enviar la lista de campers como respuesta en formato JSON
/*
        const jsonFormateado = format(listarCampers);
        res.status(200).send(jsonFormateado);
*/
const express = require("express");
require("dotenv").config();

//Crear el servidor de express
const app = express();

//Lectura y parseo del body
app.use(express.json());

// Rutas

//Todo lo que este archivo va a exportar lo va a habilitar
//en esta ruta
app.use("/api/auth", require("./routes/auth"));
// TODO CRUD: Eventos

//Directorio publico
app.use(express.static("public"));

//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});

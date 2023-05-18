require('colors');
const express = require('express');
const app = express();

//genera las rutas
//app.get("/", (request, response)=>{
//    response.send("Hola mundo desde express")
//});

//middlware -modulo que su ejecucion esta relacionada con la carga de la aplicacion. 
app.use(express.static("statics/html")); //implementaremos middleware para una pagina web estatica




//genera el servidor corriendo en el puerto 5000
app.listen(5000, () => {
    console.log("servidor corriendo desde express".rainbow)
})

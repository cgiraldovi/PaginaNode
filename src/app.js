require('colors');
require('dotenv').config();
const express = require('express');
//configuracion de habdlebars
const {create} = require('express-handlebars');

const app = express();

const hbs = create({
    extname: ".hbs"
}); //cual va a ser la extension de los archivos handlevars que se van a usar

//se informa que el motor de plantillas es handlevars
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./vistas")//segundo parametro es la carpeta que elegimos




//genera las rutas
//app.get("/", (request, response)=>{
//    response.send("Hola mundo desde express")
//});

//middlware -modulo que su ejecucion esta relacionada con la carga de la aplicacion. 
//app.use(express.static("statics/html")); //implementaremos middleware para una pagina web estatica

app.use("/", require('../rutes/rutes'));


//genera el servidor corriendo en el puerto 5000
app.listen(process.env.PORT, () => {
    console.log("servidor corriendo desde express".rainbow)
})

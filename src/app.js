require('colors');
require('dotenv').config();
const express = require('express');
//configuracion de habdlebars
const {create} = require('express-handlebars');

const app = express();

const hbs = create({
    extname: ".hbs", //cual va a ser la extension de los archivos handlevars que se van a usar
    helpers: require('../vistas/helpers/handlebars.js'), //indica la carpeta en donde se guardaran los helpers
    //informa el lugar en donde guardaremos los partials/componentes
}); 


//se informa que el motor de plantillas es handlevars
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./vistas")//segundo parametro es la carpeta que elegimos


//crear variables locales, pueden ser usadas en toda la aplicacion
app.use((request, response, next)=>{
    response.locals.variable1 = "mi muneca me hablo"; //variable puede ser usada en cualquiera de las vistas (hbs)
    next();
});

app.use("/", require('../rutes/rutes'));

app.use((request, response) => {
    response.status(404).render("error/404", {tittlePage: "Pagina no encontrada"});
});

//genera el servidor corriendo en el puerto 5000
app.listen(process.env.PORT, () => {
    console.log("servidor corriendo desde express".rainbow)
})

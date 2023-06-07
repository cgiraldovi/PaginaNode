require('colors');
require('dotenv').config();
const express = require('express'); 
const session = require('express-session'); //configuracion session
const csrf = require('csurf') //para csurf
const {create} = require('express-handlebars');  //configuracion de habdlebars
const flash = require('connect-flash');

const app = express();

app.use(
    session({
        secret: process.env.SECRETO,
        resave: false,
        saveUninitialized:false,
        name:"secret-name",
        cookie:
        {
            expires: 600000
        }
    })
); //sessions


app.use(express.urlencoded({extended:true})); //habilitamos para formularios

app.use(csrf()); //inicializar CSRF

const hbs = create({
    extname: ".hbs", //cual va a ser la extension de los archivos handlevars que se van a usar
    helpers: require('../vistas/helpers/handlebars.js'), //indica la carpeta en donde se guardaran los helpers
    //informa el lugar en donde guardaremos los partials/componentes
    partialsDir: ['vistas/componentes'] //no poner ../
}); 


//se informa que el motor de plantillas es handlevars
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./vistas");//segundo parametro es la carpeta que elegimos

app.use(flash());

//crear variables locales, pueden ser usadas en toda la aplicacion
app.use((request, response, next)=>{
    response.locals.variable1 = "mi muneca me hablo"; //variable puede ser usada en cualquiera de las vistas (hbs)
    response.locals.csrfToken = request.csrfToken(); 
    response.locals.css = request.flash("css");
    response.locals.mensajes = request.flash("mensajes");
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

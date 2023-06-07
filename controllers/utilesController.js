//mail
const nodemailer = require('nodemailer');
//jwt
const jwt = require('jwt-simple');
const moment = require('moment');
//QR
const codigoQR = require('qrcode');
//rest
let Client = require('node-rest-client').Client;
let datos; 


module.exports.home = (request, response) => {
    return response.render("../vistas/utiles/home.hbs", {tittlePage: "Utiles"});
};

module.exports.jwt = (request, response) => {
    let payload = {
        sub:1, 
        nombre:"cesar",
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()
    };

    let token = jwt.encode(payload, process.env.SECRETO); //token creado
    let traducido = jwt.decode(token, process.env.SECRETO);
    response.send({token:token, traducido:traducido});
};

module.exports.qr = (request, response) => {
    let url = "https://www.youtube.com/" //apunta hacia la url
    
    codigoQR.toDataURL(url, (err, src) => {
        if(err){
            response.send("Error ocurrio");
        }
        return response.render("../vistas/utiles/qr.hbs", {tittlePage: "Crear QR", src:src, url:url})
    });
};

module.exports.cliente_rest = (request, response) => {
    let cliente = new Client();
    cliente.get("https://jsonplaceholder.typicode.com/users/1", (data, response) => {
        datos = data;
    });

    //console.log(datos);


    return response.render("../vistas/utiles/cliente_rest", {tittlePage: "Crear QR", datos:datos})
};

/*

module.exports.mail = async (request, response) => {
    
    const transport = nodemailer.createTransport(
        {
            host: process.env.SMTP_SERVER,
            port: process.env.SMTP_PORT,
            auth:{
                user:process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        }
    );

    await transport.sendMail(
        {
            from:'"Ejemplo node"' < + process.env.SMTP_USER + '>',
            to: "cgiraldovi@hotmail.com",
            subject: "Email de prueba",
            html: `<h1>Hola titulo del correo</h1>`
        }
    );

    request.flash("css", "succes");
    request.flash("mensajes", [{msg: "se ha enviado el mail exitosamente"}])
    return response.redirect("/utiles");
};

*/

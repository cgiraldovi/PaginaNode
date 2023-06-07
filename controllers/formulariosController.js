const {validationResult} = require('express-validator');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');


module.exports.home = (request, response) => {    
    return response.render("../vistas/formularios/home.hbs", {tittlePage: "Formularios"});
};

module.exports.normal = (request, response) => {    
    return response.render("../vistas/formularios/normal.hbs", {tittlePage: "Formulario simple"});
};

module.exports.upload = (request, response) => {    
    return response.render("../vistas/formularios/upload.hbs", {tittlePage: "Formulario upload"});
};


//post

module.exports.normal_post = (request, response) => {   
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        request.flash("css", "danger");
        request.flash("mensajes", errors.array());
        return response.redirect("../formularios/normal");
    }

    const {nombre, correo, telefono} = request.body; //form-data
    response.send(`nombre: ${nombre} correo: ${correo} telefono: ${telefono}`);
};

module.exports.upload_post = (request, response) => {    
    const form = new formidable.IncomingForm();
    form.maxFileSize = 100 * 1024 * 1024; //10MB
    form.parse(request, async(err, fields, files) => {
        try{
            if(err){
                throw new Error('Se un produjo un error en: ' + err);
            }
            const file = files.foto;
            if(file.originalFilename === ""){
                throw new Error("No se subio ninguna imagen");
            }

            const imageTypes = [
                "image/png",
            ];

            if(!imageTypes.includes(file.mimetype)){
                throw new Error("Por favor agrega una imagen PNG");
            }

            if(file.size > 100 * 1024 * 1024){
                throw new Error("Maximo 10MB");
            }

            var unix = Math.round(+new Date()/1000);
            nombre_final = unix + ".png";

            const dirFile = path.join(__dirname, `../statics/uploads/${nombre_final}`);

            fs.copyFile(file.filepath, dirFile, (err) => {
                if(err) throw err;
            });

            request.flash("css", "success");
            request.flash("mensajes", [{msg: "Se guardo la foto"}]);
            return response.redirect("../formularios/upload");


        } catch(error){
            request.flash("css", "danger");
            request.flash("mensajes", [{msg: error.message}]);
            return response.redirect("../formularios/upload");
        }
    });
};
module.exports.home = (request, response) => {    
    return response.render("../vistas/formularios/home.hbs", {tittlePage: "Formularios"});
};

module.exports.normal = (request, response) => {    
    return response.render("../vistas/formularios/normal.hbs", {tittlePage: "Formulario simple"});
};

//post

module.exports.normal_post = (request, response) => {   
    const {nombre, correo, telefono} = request.body;

    response.send(`nombre: ${nombre} correo: ${correo} telefono: ${telefono}`);
};
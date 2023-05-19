module.exports.home = (request, response) => {
    response.send("hola desde el controlador home");
}

module.exports.we = (request, response) => {
    response.send("hola desde el controlador we");
}

module.exports.params = (request, response) => {
    //desestructuracion
    const {id, slug} = request.params;

    response.send("hola desde el controlador we, id = "+ id + "slug = "+ slug);
}
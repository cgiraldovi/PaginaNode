module.exports.home = (request, response) => {

    let nombre = "Cristian Giraldo";
    const paises = [
        {nombre: "chile",
        nic: "cl"},
        {nombre:"colombia",
        nic:"col"}
    ];

    return response.render("../vistas/home/home.hbs", {tittlePage: "Inicio", nombre:nombre, paises:paises});
};

//todo lo que se pase por estas llaves {} va a estar disponible dentro de la vista hobe.hbs, al estar en el home
//tambien esta directo en el main.hbs 




//pdf
const pdf = require("html-pdf");
const fs = require("fs");
//excel
let path = require('path');
const xls = require('excel4node');
//csv
const {Parser} = require('json2csv');

module.exports.home = (request, response) =>  {
    return response.render("../vistas/reportes/home.hbs")
};


module.exports.pdf = (request, response) =>  {
    const ubicacionPlantilla = require.resolve(process.cwd() + "/vistas/reportes/pdf.html");
    let contenidoHTML = fs.readFileSync(ubicacionPlantilla, 'utf-8');
    
    //emulacion base de datos
    let valor = "soy un valor";
    let ruta = process.cwd();

    contenidoHTML = contenidoHTML.replace("{{valor}}",valor);
    contenidoHTML = contenidoHTML.replace("{{ruta}}",ruta);

    pdf.create(contenidoHTML).toStream((error,stream) => {
        if(error){
            return response.end("Error creando el PDF: " + error);
        } else {
            response.setHeader("Content-Type", "application/pdf");
            stream.pipe(response);
        }

    });
};


module.exports.excel = (request, response) =>  {
    //libro de trabajo
    let libro = new xls.Workbook();

    //hoja de trabajo
    let hoja = libro.addWorksheet("Hoja 1");

    //estilo normal
    let style = libro.createStyle({
        font:{
            color: '#040404',
            size: 12
        }
    });

    //libro verde
    let greenS = libro.createStyle({
        font:{
            color: '#388813',
            size: 12
        }
    });


    //primera fila excel
    hoja.cell(1,1).string("ID").style(style);
    hoja.cell(1,2).string("Nombre").style(style);
    hoja.cell(1,3).string("Precio").style(style);

    //segunda fila excel
    hoja.cell(2,1).number("1").style(style);
    hoja.cell(2,2).string("Joan").style(style);
    hoja.cell(2,3).number("0").style(style);

    //reporte
    let timestamp = Math.floor(Date.now()/1000);

    const pathExcel = path.join(process.cwd() + "/statics/", 'excel', `reporte_${timestamp}.xlsx`);
    libro.write(pathExcel, (err, stats) => {
        if(err){
            console.log(err)
        } else {
            response.download(pathExcel);
            return false;
        }

    });

}

module.exports.csv = (request, response) =>  {
    //simulacion base de datos
    const productos = [
        {
            id:1,
            nombre: 'pepe',
            preceio: 9000
        },
        {
            id:2,
            nombre: 'pepo',
            preceio: 7000
        }
    ];

    datos = Object.keys(productos[0]);
    const csv = new Parser({datos});
    let timestamp = Math.floor(Date.now()/1000);
    var nombre = `reporte_${timestamp}.csv`

    fs.writeFile(process.cwd() + "/statics/csv/" + nombre, csv.parse(productos), (err)=>{
        if(err){
            console.log(err);
            throw err;
        }
        response.download(process.cwd() + "/statics/csv/" + nombre);
    })


}
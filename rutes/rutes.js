const express = require('express');
const {body} = require('express-validator');
const router = express.Router();

const homeController = require('../controllers/homeController');
const formulariosController = require('../controllers/formulariosController');
const reportesController = require('../controllers/reportesController');


//GET

//home
router.get("/", homeController.home);

//formularios
router.get("/formularios", formulariosController.home);
router.get("/formularios/normal", formulariosController.normal);
router.get("/formularios/upload", formulariosController.upload);

//reportes
router.get("/reportes", reportesController.home);
router.get("/reportes/pdf", reportesController.pdf);
router.get("/reportes/excel", reportesController.excel);
router.get("/reportes/csv", reportesController.csv);

//POST
router.post("/formularios/normal", [
    body("nombre", "Ingrese un nombre valido")
    .trim()
    .notEmpty()
    .escape(),
    body("correo", "Ingrese un E-Mail valido")
    .trim()
    .isEmail()
    .escape()
], formulariosController.normal_post);


router.post("/formularios/upload", formulariosController.upload_post);


module.exports = router;


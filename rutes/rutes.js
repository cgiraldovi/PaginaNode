const express = require('express');

const router = express.Router();

const homeController = require('../controllers/homeController');
const formulariosController = require('../controllers/formulariosController');

//get
router.get("/", homeController.home); //ingresar a la vista home
router.get("/formularios", formulariosController.home);
router.get("/formularios/normal", formulariosController.normal);
//post
router.post("/formularios/normal", formulariosController.normal_post);



module.exports = router;


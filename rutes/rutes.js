const express = require('express');

const router = express.Router();

const homeController = require('../controllers/homeController');

router.get("/", homeController.home); //ingresar a la vista home
router.get("/we", homeController.we);  //ingresar a la vista we
router.get("/params/:id/:slug", homeController.params);  //ingresar a la vista we


module.exports = router;
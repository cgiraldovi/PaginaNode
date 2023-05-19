const express = require('express');

const router = express.Router();

const homeController = require('../controllers/homeController');

router.get("/", homeController.home); //ingresar a la vista home

module.exports = router;
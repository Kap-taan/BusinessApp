const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main');

const isLogged = require('../middlewares/is-inside');

router.get('/', isLogged, mainController.getIndex);

router.get('/about', isLogged, mainController.getAbout);

router.get('/work', isLogged, mainController.getWork);

router.get('/team', isLogged, mainController.getTeam);

router.get('/contact', isLogged, mainController.getContact);

router.get('/blog', isLogged, mainController.getBlog);

module.exports = router;
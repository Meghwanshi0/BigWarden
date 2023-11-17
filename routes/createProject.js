const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// form submission to create a new project
router.post('/create', homeController.create);

module.exports = router;

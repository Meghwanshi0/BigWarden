const express = require('express');
const router = express.Router();
const homeController =  require('../controllers/homeController');

//router to get the list of projects
router.get('/', homeController.home);

//router for new project creation
router.post('/create', homeController.create);

router.use('/projectDetails', require('./projectDetails'));



module.exports=router;
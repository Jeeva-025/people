// routes/peopleRoutes.js
const express = require('express');
const multer= require("../utils/storage");
const router = express.Router();
const peopleController = require('../controller/peopleController');

// Route for getting all people
router.get('/', peopleController.getAllPeople);
router.post('/insert',peopleController.insertPeople);

module.exports = router;

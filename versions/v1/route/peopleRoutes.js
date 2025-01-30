// routes/peopleRoutes.js
const express = require('express');
const upload= require("../utils/storage");
const router = express.Router();
const validateMiddleware= require("../middleware/validation.middleware")
const validate= require("../validation/validation")

const peopleController = require('../controller/peopleController');

// Route for getting all people
router.get('/', peopleController.getAllPeople);
router.post('/insert',validateMiddleware.validateBody(validate.validatePeopleInsert()),upload.single("imagename"),peopleController.insertPeople);

module.exports = router;

const express = require('express');
const router = express.Router();
const validation= require("../validation/validation")
const validUmiddleware= require("../middleware/validation.middleware")
const channelController = require("../controller/channelController");

// Route for getting all people
router.get('/allChannels', channelController.channels);
router.post('/channelInsert',validUmiddleware.validateBody(validation.validateChannel()),channelController.Insert);

module.exports = router;
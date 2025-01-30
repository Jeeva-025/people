// routes/peopleRoutes.js
const express = require('express');
const router = express.Router();
const validation= require("../validation/validation");
const validUmiddleware= require("../middleware/validation.middleware")
const inviteController = require("../controller/inviteController");

// Route for getting all people
router.get('/invitedPeople', inviteController.invitedPeople);
router.post('/invite', validUmiddleware.validateBody(validation.validateInvitation()),inviteController.insertPeople);

module.exports = router;

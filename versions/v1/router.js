const express = require("express");
const router = express.Router();

// Import Controllers
const channelRoutes = require("./route/channelRoutes");
const inviteRoutes = require("./route/invitedRoutes");
const peopleRoutes = require("./route/peopleRoutes");

// Use Controllers as Routes
router.use("/channels", channelRoutes);
router.use("/invite", inviteRoutes);
router.use("/people", peopleRoutes);

module.exports = router; // ✅ Ensure that you export `router`, NOT an object

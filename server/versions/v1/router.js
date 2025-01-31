const express = require("express");
const router = express.Router();

// Import Controllers

const inviteRoutes = require("./routes/inviteRoutes");
const peopleRoutes = require("./routes/peopleRoutes");
const channelRoutes=require("./routes/channelRoutes");

// Use Controllers as Routes

router.use("/invite", inviteRoutes);
router.use("/people", peopleRoutes);
router.use("/channels", channelRoutes);

module.exports = router; 

const { validateChannel } = require("../validation/validation");
const Channel = require("../model/channel"); // Correct import
const moment = require("moment"); // Import moment

const controller = {};


controller.channels = async (req, res) => {
  try {
    const channels = await Channel.findAll();
    res.json(channels);
  } catch (error) {
    console.error("Error fetching channels:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


controller.Insert = async (req, res) => {
  try {
    // Validate input
    const { error } = validateChannel(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { createdBy, channelName } = req.body;

    const createdAt = moment().format("YYYY-MM-DD HH:mm:ss"); // Example of IST format

    // Create new channel
    await Channel.create({ createdBy, channelName, createdAt });

    res.json({ message: "Successfully Created" });
  } catch (error) {
    console.error("Error inserting channel:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = controller;

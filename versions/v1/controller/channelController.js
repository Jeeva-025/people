
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
    const {channelName } = req.body;
    await Channel.create({ channelName,});
    res.json({ message: "Successfully Created" });
  } catch (error) {
    console.error("Error inserting channel:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = controller;

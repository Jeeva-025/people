// controllers/peopleController.js
const { validateInvitation } = require('../validation/validation');
const invite = require("../model/invite");
const channelTable = require("../model/channel");
const userChannelTable = require("../model/userChannel");
const moment = require('moment');

const controller = {};

// Get All Invited People
controller.invitedPeople = async (req, res) => {
  try {
    const users = await invite.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Insert a New Invited Person
controller.insertPeople = async (req, res) => {
  try {
    const { email, invitedBy, status, channels = [], type } = req.body;
    
    if (!email || !invitedBy || !status || !type || !Array.isArray(channels)) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const now = new Date();
    const invitedDate = now.toISOString().split("T")[0];

    const toDate = new Date();
    toDate.setDate(now.getDate() + 5);
    const expireDate = toDate.toISOString().split("T")[0];

    const channelIdArray = await Promise.all(
      channels.map(async (channel) => {
        const data = await channelTable.findOne({ where: { channelName: channel } });
        return data ? data.id : null;
      })
    );

    const channelIdString = channelIdArray.filter(id => id !== null).join(',');

    if (!channelIdString) {
      return res.status(400).json({ error: "No valid channels found" });
    }

    // Insert into 'invite' table
    const newUser = await invite.create({
      email,
      invitedBy,
      status,
      type,
      invitedDate,
      expireDate,
      channelId: channelIdString, // Store as a string
    });

    res.json({ message: "User successfully invited" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = controller;

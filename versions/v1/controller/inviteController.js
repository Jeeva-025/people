// controllers/peopleController.js
const { validateInvitation } = require('../validation/validation');
const invite = require("../model/invite");
const moment = require('moment');
const controller={}
controller.invitedPeople = async (req, res) => {
  try {
    const users = await invite.findAll();
    users.forEach(user => {
      user.createdAt = moment(user.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
      user.updatedAt = moment(user.updatedAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');});

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};




controller.insertPeople = async (req, res) => {
  const { error } = validateInvitation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
    const{email,status,channel}= req.body;
  try {
    const nuser = await User.create({email,status,channel});
   
    res.json({message: "Invited"});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports= controller;
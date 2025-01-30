// controllers/peopleController.js
const { validateInvitation } = require('../validation/validation');
const invite = require("../model/invite");
const moment = require('moment');
const controller={}
controller.invitedPeople = async (req, res) => {
  try {
    const users = await invite.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

controller.insertPeople = async (req, res) => {
    const{email,invitedBy,status,channels}= req.body;
    const now= new Date();
    const invitedDate= now.toISOString().split("T")[0]
    const toDate= new Date()
    toDate.setDate(now.getDate()+5);
    const expireDate= toDate.toISOString().split("T")[0]
    const channelId="1"
  try {
    const nuser = await invite.create({email,invitedBy,status,invitedDate,expireDate,channelId});
   
    res.json({message: "Invited"});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports= controller;
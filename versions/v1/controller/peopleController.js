const fs = require('fs');
const path = require('path');
const User = require("../model/people");
const invite= require("../model/invite")
const userChannel= require("../model/userChannel")
const { where } = require("sequelize");
const upload = require('../utils/storage');

const controller = {};

controller.getAllPeople = async (req, res) => {
  try {
    const {user_name,order,designation,type } = req.query; 
    const whereClause = {};
    const sortOrder = [];

    if (user_name) {
      whereClause.user_name = user_name; 
    }

    if (designation) {
      whereClause.designation = designation; 
    }
    if (type) {
      whereClause.type = type; 
    }
    if (order === "A-Z" || order === "a-z") {
      sortOrder.push(["user_name", "ASC"]); 
    } else if (order === "Z-A" || order === "z-a") {
      sortOrder.push(["user_name", "DESC"]); 
    }

    const users = await User.findAll({
      where: Object.keys(whereClause).length ? whereClause : undefined,
      order: sortOrder.length ? sortOrder : undefined,
    });

    if (users.length > 0) {
      const usersWithImages = users.map(user => {
         user.imagename = `http://localhost:8080/uploads/${user.imagename}`;
        return {
          ...user.dataValues, 
        };
      });

      res.json(usersWithImages);
    } else {
      res.json({ message: "No data found matching the criteria." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


controller.insertPeople = async (req, res) => {
  try {
    const { user_name, email, mobile_number, status, designation, type } = req.body;

   
    const data = await invite.findOne({ where: { email } });

    if (!data) {
      return res.status(404).json({ message: "Email not found in invite table" });
    }

    const now = new Date();
    const exdate = new Date(data.expireDate);
    
    if (now >= exdate) {
      return res.status(400).json({ message: "Invitation has expired" });
    }

    const jDate = now.toISOString().split("T")[0];
    data.joinedDate = jDate;
    data.status = "accepted";
    await data.save();

    if (!user_name || !email || !mobile_number || !status || !designation || !type) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    
    await User.create({
      imagename: req.file.filename,
      user_name,
      email,
      mobile_number,
      status,
      designation,
      type,
    });

    const invitedBy = data.invitedBy;
    const channelId = data.channelId; 
   
    const temp= await User.findOne({where:{email}})
    await userChannel.create({
      invitedBy,
      userId: temp.id, 
      channelId, 
      status: "active",
    });

    res.status(200).json({ message: "User created and added to user channel successfully!" });

  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = controller;

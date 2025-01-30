const fs = require('fs');
const path = require('path');
const User = require("../model/people");
const invite= require("../model/invite")
const { where } = require("sequelize");
const upload = require('../utils/storage');

const controller = {};

controller.getAllPeople = async (req, res) => {
  try {
    const {user_name,order,designation,type } = req.query; // Extract query parameters
    const whereClause = {};
    const sortOrder = [];

    if (user_name) {
      whereClause.user_name = user_name; // Filter by name
    }

    if (designation) {
      whereClause.designation = designation; // Filter by designation
    }
    if (type) {
      whereClause.type = type; // Filter by designation
    }
    if (order === "A-Z" || order === "a-z") {
      sortOrder.push(["user_name", "ASC"]); // Sort ascending by name
    } else if (order === "Z-A" || order === "z-a") {
      sortOrder.push(["user_name", "DESC"]); // Sort descending by name
    }

    const users = await User.findAll({
      where: Object.keys(whereClause).length ? whereClause : undefined,
      order: sortOrder.length ? sortOrder : undefined,
    });

    if (users.length > 0) {
      const usersWithImages = users.map(user => {
        // Assuming the imagename field has the correct filename and is stored in the 'uploads' directory
         user.imagename = `http://localhost:8080/uploads/${user.imagename}`;
        return {
          ...user.dataValues, // keep all user data
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

      try {
        const data = await invite.findOne({
          where: {
            email: email 
          }
        });

        if (!data) {
          return res.status(404).json({ message: 'Mail not present in invite table' });
        }

        const now = new Date();
        const indate = new Date(data.invitedDate);  // Ensure it's a Date object
        const exdate = new Date(data.expireDate); 
        const jDate= now.toISOString().split("T")[0];
        data.joinedDate= jDate;
        data.status= "accepted"
        data.save()
        if (indate <= now && now <= exdate) {
          if (!user_name || !email || !mobile_number || !status || !designation || !type) {
            return res.status(400).json({ message: 'Missing required fields' });
          }

          // Create new user
          await User.create({
            imagename: req.file.filename, 
            user_name,
            email,
            mobile_number,
            status,
            designation,
            type
          });

          res.status(200).json({ message: 'User created successfully!' });
        } else {
          res.status(400).json({ message: 'Invitation has expired' });
        }
      } catch (error) {
        console.log("Error in finding invitation:", error);
        res.status(500).json({ message: 'Error occurred while processing invitation', error: error });
      }
    
  } catch (err) {
    console.log("General error:", err);
    res.status(500).json({ message: 'Error occurred', error: err });
  }
};




module.exports = controller;

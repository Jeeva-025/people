const multer= require("multer");
const fs = require('fs');
const path = require('path');
const User = require("../model/people");
const moment = require('moment-timezone'); 


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


// Ensure the uploads directory exists
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir); // Set destination for uploaded files
  },
  filename: (req, file, cb) => {
    const now = new Date();
    const imagename = req.body.imagename || 'default'; // Fallback if imagename is undefined
    const timestamp = now.toISOString().replace(/[-:.]/g, ''); // Remove unwanted characters from the timestamp
    const extension = path.extname(file.originalname); // Get file extension (e.g., .png, .jpg)

    const newimagename = imagename + '-' + timestamp + extension; // Append imagename and timestamp to create the new filename
    cb(null, newimagename); // Set the file name
  }
});

const upload = multer({ storage: storage });

controller.insertPeople = async (req, res) => {
  console.log("Request Body:", req.body); // This should show the form fields
  
  try {
    upload.single('imagename')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Error uploading file', error: err });
      }

      // Ensure the necessary fields are present
      const { user_name, email, mobile_number, status, designation } = req.body;

      if (!user_name || !email || !mobile_number || !status || !designation) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      await User.create({
        imagename: req.file.filename, // Ensure the image file is saved
        user_name,
        email,
        mobile_number,
        status,
        designation
      });

      res.status(200).json({ message: 'User created successfully!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error occurred', error: err });
  }
};




module.exports = controller;

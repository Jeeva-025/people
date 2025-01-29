import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const People = sequelize.define("People", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING(255), 
    allowNull: false,
    unique:true,
  },

  phoneNo: {
    type: DataTypes.STRING,  // Optional field
    allowNull: false,
    unique:true,
  },

  designation: {
    type: DataTypes.STRING,  // Default value of 0
    allowNull: false,
  },

  type: {
    type: DataTypes.STRING,  
    allowNull: false,
  },

  imageName:{
    type: DataTypes.STRING,  
    allowNull: false,
    unique:true,
  },

  status:{
    type: DataTypes.STRING,  
    allowNull: false,
    defaultValue:"accept"
  }

}, {
  timestamps: true,
  tableName: "peoples",
});

export default People;
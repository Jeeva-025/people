import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const UserChannel = sequelize.define("UserChannel", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  userId:{
    type: DataTypes.INTEGER, 
    allowNull: false,   
  },

  invitedById: {
    type: DataTypes.INTEGER,  // Optional field
    allowNull: false,
  },

  channelId: {
    type: DataTypes.TEXT,  // Default value of 0
    allowNull: true,
  },

  status:{
    type: DataTypes.STRING,  
    allowNull: false,
    defaultValue:"active"
  }

}, {
  timestamps: true,
  tableName: "userChannels",
});

export default UserChannel;
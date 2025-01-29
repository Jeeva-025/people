import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Invite = sequelize.define("Invite", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  email: {
    type: DataTypes.STRING(255), 
    allowNull: false,
    unique:true,
  },

  invitedById: {
    type: DataTypes.INTEGER,  // Optional field
    allowNull: false,
  },

  channelId: {
    type: DataTypes.TEXT,  // Default value of 0
    allowNull: true,
  },

  invitedDate: {
    type: DataTypes.DATE,  
    allowNull: false,
    defaultValue:DataTypes.NOW(),
  },

  joinedDate:{
    type: DataTypes.DATE,  
    allowNull: true,
  },
  type:{
    type: DataTypes.STRING,  
    allowNull: false,
  },
  expiryDate:{
    type:DataTypes.DATE,
    allowNull:false,
  },

  status:{
    type: DataTypes.STRING,  
    allowNull: false,
    defaultValue:"notaccept"
  }

}, {
  timestamps: true,
  tableName: "invites",
});

export default Invite;
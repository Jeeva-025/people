import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Channel = sequelize.define("Channel", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING(255), 
    allowNull: false,
    unique:true,
  },

  status:{
    type: DataTypes.STRING,  
    allowNull: false,
    defaultValue:"active"
  }

}, {
  timestamps: true,
  tableName: "channels",
});

export default Channel;
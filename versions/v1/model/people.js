const {  DataTypes } = require("sequelize");
const {sequelize} = require("./db.js"); // Ensure this points to your Sequelize instance

const User = sequelize.define("people", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  imagename:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  mobile_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "people", // Name of your database table
  timestamps: false,
});

sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

module.exports = User;

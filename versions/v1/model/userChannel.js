const { DataTypes }= require( "sequelize");
const {sequelize} =require( "./db.js");

// Step 2: Define the Model
const User = sequelize.define('userChannel', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  invitedById:{
    type: DataTypes.INTEGER,
    allowNull:false,
  },
  userId:{
    type: DataTypes.INTEGER,
    allowNull:false,
  },
  channelId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status:{
    type:DataTypes.STRING,
    allowNull:false,
  },
}, {
  tableName: 'userChannel', // Specify the table name if different
  timestamps: true,   // Adds createdAt and updatedAt fields
});

sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
module.exports=User;


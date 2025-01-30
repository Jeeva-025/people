const { DataTypes }= require( "sequelize");
const {sequelize} =require( "./db.js");
// Step 2: Define the Model
const User = sequelize.define('invite', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure email is unique
    validate: {
      isEmail: true, // Validate email format
    },
  },
  invitedBy:{
    type: DataTypes.STRING,
    allowNull:false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  invitedDate:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  expireDate:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  joinedDate:{
    type:DataTypes.STRING,
    allowNull: true,
  },
  channelId:{
    type:DataTypes.STRING,
    allowNull:true,
  }
}, {
  tableName: 'invite', // Specify the table name if different
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

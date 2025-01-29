import express, { urlencoded } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import sequelize from "./models/db.js";
import People from "./models/People.js";
import Invite from "./models/Invite.js";
import UserChannel from "./models/UserChannel.js";
import Channel from "./models/Channel.js";
import PeopleRouter from "./routes/People.js";
import { testSequelizeConnection } from "./models/db.js"
import InviteRouter from "./routes/Invite.js";

const app=express();
dotenv.config();
app.use(cors({origin:true, credentials:true}));
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true}));

app.use('/uploads', express.static('uploads'));


app.use("/api/people", PeopleRouter);
app.use("/api/invite", InviteRouter);

sequelize.sync()
  .then(() => console.log('Database synced.'))
  .catch(error => console.error('Error syncing database:', error));

const startServer=async()=>{
    try{
       
       testSequelizeConnection();
        app.listen(8080, ()=> console.log("server is started"))
    }catch(err){
        console.log(err.message);
    }
}

startServer();
import People from "../models/People.js";
import Invite from "../models/Invite.js";
import UserChannel from "../models/UserChannel.js";

export const createPeople = async (req, res) => {
    const { username, email, phoneNo, designation, type } = req.body;
    const imageName = req.file ? req.file.filename : null;
  
    try {
      // Fetch the invite entry based on the provided email
      const invite = await Invite.findOne({
        where: { email },
      });
  
      // If no invite is found
      if (!invite) {
        return res.status(400).json({
          message: "No invitation found for this email",
        });
      }
      if (invite.status === "inactive") {
        return res.status(400).json({
          message: "Invitation is deleted",
        });
      }
  
      // Check if the invite is expired (current date > expiry date)
      const currentDate = new Date();
      if (currentDate > new Date(invite.expiryDate)) {
        return res.status(400).json({
          message: "Invitation has expired",
        });
      }
  
      // Check if the invite status is not 'inactive'
      
  
      // Proceed with inserting into the 'People' table
      const people = await People.create({
        username,
        email,
        phoneNo,
        designation,
        type,
        imageName,
      });
  
      // If channelId is not null in the invite entry, insert into UserChannel table
      if (invite.channelId && invite.channelId.trim() !== "") {
        
        await UserChannel.create({
          userId: people.id,  // ID of the newly inserted user in 'People' table
          channelId: invite.channelId,  // channelId from the 'Invite' table
          invitedById: invite.invitedById,  // invitedById from the 'Invite' table
        });
      }
      invite.status="accept";
      await invite.save();
  
       res.status(201).json(people);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Error found in inserting data",
        error: err.message,
      });
    }
  };

export const getAllPeoples= async(req,res)=>{
    try{
      const peoples=await People.findAll();
      res.status(200).json(peoples);
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"Error in fetching all data",
            error:err.message
        })
    }
}


export const getPeople=async(req, res)=>{
    const{id}=req.params;
    try{
        const people=await People.findByPk(id);
        if (!people) {
            return res.status(404).json({message: "Person not found"});
        }

        res.status(200).json(people);   

    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"Error in fetching all data",
            error:err.message
        })
    }
}

export const deletePeople=async(req, res)=>{
    const{id}=req.params;
    try{
        const people=await People.findByPk(id);
        if(!people){
            return res.status(404).json({maessage:"People is not found"});
        }

        people.status="inactive";

        await people.save();
        res.status(200).json({message:"People status updated to Inactive"});

    }catch(err){
        console.log(err.message);
        res.status(500).json({
            message:"Error in fetching all data",
            error:err.message
        })
    }
}
import Invite from "../models/Invite.js";

export const creatInvite=async(req, res)=>{
    const{email, invitedById, channelId, type }=req.body;

    const invitedDate = new Date(); // Current date and time
    const expiryDate = new Date(invitedDate);
    expiryDate.setDate(invitedDate.getDate() + 7); 

    try{
        const newInvite = await Invite.create({
            email,
            invitedById,
            channelId,
            invitedDate,
            type,
            expiryDate, // Add calculated expiryDate
          });
      
          res.status(201).json(newInvite);
     

    }catch(err){
        console.log(err.message);
        res.status(500).json({
            message:"Error in creating data",
            error:err.message
        })
    }
}

export const getAllInvites=async(req, res)=>{
    try{
     const invites=await Invite.findAll();
     res.status(200).json(invites)
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({
            message:"Error in fetching the data",
            error:err.message
        })
    }
}


export const deleteInvite=async(req, res)=>{
   const{id}=req.params;
    try{
     const invite= await Invite.findByPk(id);
     if(!invite){
        return res.status(404).json({message:"Invite is not found"});
     }
     invite.status="inactive";
     res.status(200).json({message:"invite status updated to Inactive"});

    }catch(err){
        console.log(err.message);
        res.status(500).json({
            message:"Error in creating data",
            error:err.message
        })
    }
}
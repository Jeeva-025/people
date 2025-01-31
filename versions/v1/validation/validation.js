const Joi = require('joi');

const validateChannel = () => {
  const schema = Joi.object({
    channelName: Joi.string().min(3).max(100).required(),
  });
  return schema
}


const validateInvitation = () => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    invitedBy: Joi.string().required(),
    status: Joi.string().valid("accepted", "not accepted", "rejected").required(),
    channels: Joi.array().items(Joi.string()).required(), // Ensure 'channels' is an array of strings
    type: Joi.string().required(), // Add 'type' field validation
  });

  return schema; // Validate and return result
};

const validatePeopleInsert=()=>{
  const schema= Joi.object({
    user_name:Joi.string().required(),
    email: Joi.string().email().required(),
    mobile_number: Joi.string().required(),
    status: Joi.string().required(),
    designation: Joi.string().required(),
    type:Joi.string().required(),
  });
  return schema;
}
module.exports = {
  validateChannel,
  validateInvitation,
  validatePeopleInsert
};

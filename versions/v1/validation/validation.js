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
    status: Joi.string().valid('accepted', 'not accepted', 'rejected').required(),
  });

  return schema; // Return the schema itself, not the result of schema.validate()
};
module.exports = {
  validateChannel,
  validateInvitation,
};

const Joi = require('joi');

const validateChannel = (data) => {
  const schema = Joi.object({
    createdBy:Joi.string().min(3).max(100).required(),
    channelName: Joi.string().min(3).max(100).required(),
  });
};

const validateInvitation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    status: Joi.string().valid('accepted', 'pending', 'rejected').required(),
    channel: Joi.string().required(),
  });
};

module.exports = {
  validateChannel,
  validateInvitation,
};

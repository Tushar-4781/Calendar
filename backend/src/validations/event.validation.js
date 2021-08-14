const Joi = require("joi");



const updateEvent = {
  body: Joi.object().keys({
    data: Joi.required(),
  }),
};

module.exports = {
    updateEvent,
};

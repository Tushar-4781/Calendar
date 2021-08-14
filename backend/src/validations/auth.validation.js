const Joi = require("joi");
const { password } = require("./custom.validation");

const register = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().custom(password,"custom Password").required(),
    name: Joi.string().required()
  })

};

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().custom(password,"custom Password").required()
  })
};

module.exports = {
  register,
  login,
};

const Joi = require('joi');
const { password } = require('./custom.validation');

const post = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    price: Joi.number().required(),
    edition: Joi.string().required(),
    categories: Joi.array().items(Joi.string()).required(),
    description: Joi.string().required(),
    language: Joi.string().required(),
    categories: Joi.array().items(Joi.string()).required(),
  }),
};

const deleteById = {
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
};



module.exports = {
  post,
  deleteById,
};
const Joi = require('joi');

//new schema for create users
const id = Joi.number().integer();
const name = Joi.string().min(3);
const image = Joi.string().uri();

const createCategorySchema = Joi.object({
    name: name.required(),
    image: image.required()
});

const updateCategorySchema = Joi.object({
    name: name,
    image: image
});

const getCategorySchema = Joi.object({
    id: id.required(),
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema }
const Joi = require('joi');

const { createUserSchema, updateUserSchema } = require('./user.schema');

//new schema for create users
const id = Joi.number().integer();
const name = Joi.string().min(3);
const lastName = Joi.string().min(3);
const phone = Joi.string();
const userId = Joi.number().integer();

const createCustomerSchema = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    phone: phone.required(),
    //user
    user: createUserSchema
});

const updateCustomerSchema = Joi.object({
    name: name,
    lastName: lastName,
    phone: phone,
    //user
    user: updateUserSchema
});

const getCustomerSchema = Joi.object({
    id: id.required(),
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema }
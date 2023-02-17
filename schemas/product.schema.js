const Joi = require('joi');

//hacer un schema para cada campo, es reutilizable

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();

//pagination
const limit = Joi.number().integer();
const offset = Joi.number().integer();

//range
const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const categoryId = Joi.number().integer();

const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    description: description.required(),
    image: image.required(),
    categoryId: categoryId.required()
});

const updateProductSchema = Joi.object({
    name: name,
    price: price,
    description: description,
    image: image,
    categoryId: categoryId
});

const getProductSchema = Joi.object({
    id: id.required(),
});

//pagination
const queryProductSquema = Joi.object({
    limit: limit,
    offset: offset,
    price: price,
    price_min: price_min,
    price_max: price_max.when('price_min', {
        is: Joi.number().integer().required(),
        then: Joi.required()
    })
})

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSquema }
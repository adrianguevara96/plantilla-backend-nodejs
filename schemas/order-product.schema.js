const Joi = require('joi');

//new schema for create order-product
const id = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const addItemSchema = Joi.object({
    orderId: orderId.required(),
    productId: productId.required(),
    amount: amount.required()
})



module.exports = { addItemSchema }
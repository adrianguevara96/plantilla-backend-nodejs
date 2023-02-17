const express = require('express');

//services
const CustomersService = require('./../services/customers.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createCustomerSchema , updateCustomerSchema, getCustomerSchema } = require('./../schemas/customer.schema')

const service = new CustomersService();
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const customers = await service.find();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req,res, next) => {
    try{
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      //body
      const body = req.body;
      const newCustomer = await service.create(body);
      //response
      res.json({
        message: "customer added",
        data: newCustomer
      })
    } catch (error) {
      next(error)
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      //params
      const { id } = req.params;
      //receive data
      const body = req.body;
      const customer = await service.update(id, body);
      //response
      res.json({
        message: 'customer updated',
        data: customer
      })
    } catch (error) {
      next(error);
    }

});

router.delete(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      //params
      const { id } = req.params;
      //receive data
      const customer = await service.delete(id);
      //response
      res.json({
        message: 'customer deleted',
        id: customer
      })
    } catch (error) {
      next(error);
    }

})

module.exports = router;


const express = require('express');

//services
const ProductService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSquema } = require('./../schemas/product.schema')

const router = express.Router();
const service = new ProductService()

router.get('/',
  validatorHandler(queryProductSquema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/', 
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      //body
      const body = req.body;
      const newProduct = await service.create(body);
      //response
      res.json({
        message: "product added",
        data: newProduct
      })
    } catch (error) {
      next(error)
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    //params
    const { id } = req.params;
    //receive data
    const body = req.body;
    const product = await service.update(id, body);
    res.json({
      message: 'product update',
      data: product
    })
  } catch (error) {
    next(error);
  }

})

router.delete(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      //params
      const { id } = req.params;
      //receive data
      const product = await service.delete(id);
      //response
      res.json({
        message: 'product deleted',
        data: product
      })
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;

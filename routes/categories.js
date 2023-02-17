const express = require('express');

//services
const CategoriesService = require('./../services/category.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createCategorySchema , updateCategorySchema, getCategorySchema } = require('./../schemas/category.schema')

const service = new CategoriesService();
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try{
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      //body
      const body = req.body;
      const newCategory = await service.create(body);
      //response
      res.json({
        message: "category added",
        data: newCategory
      })
    } catch (error) {
      next(error)
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      //params
      const { id } = req.params;
      //receive data
      const body = req.body;
      const category = await service.update(id, body);
      //response
      res.json({
        message: 'category updated',
        data: category
      })
    } catch (error) {
      next(error);
    }

});

router.delete(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      //params
      const { id } = req.params;
      //receive data
      const category = await service.delete(id);
      //response
      res.json({
        message: 'category deleted',
        id: category
      })
    } catch (error) {
      next(error);
    }

})

module.exports = router;

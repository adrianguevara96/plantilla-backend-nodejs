const express = require('express');

//services
const UsersService = require('./../services/users.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/user.schema')

const service = new UsersService()
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req,res, next) => {
    try{
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      //body
      const body = req.body;
      const newUser = await service.create(body);
      //response
      res.json({
        message: "user added",
        data: newUser
      })
    } catch (error) {
      next(error)
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      //params
      const { id } = req.params;
      //receive data
      const body = req.body;
      const user = await service.update(id, body);
      //response
      res.json({
        message: 'user updated',
        data: user
      })
    } catch (error) {
      next(error);
    }

});

router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      //params
      const { id } = req.params;
      //receive data
      const user = await service.delete(id);
      //response
      res.json({
        message: 'user deleted',
        id: user
      })
    } catch (error) {
      next(error);
    }

})

module.exports = router;


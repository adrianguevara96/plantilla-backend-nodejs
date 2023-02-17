const express = require('express');

const productsRouter = require('./products');
const categoriesRouter = require('./categories');
const usersRouter = require('./users');
const customersRouter = require('./customers');
const ordersRouter = require('./orders');

function routerApi(app) {
  //path global
  const router = express.Router();

  app.use('/api/v1', router);

  //routers
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
  router.use('/orders', ordersRouter);
}

module.exports = routerApi;

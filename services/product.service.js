const boom = require('@hapi/boom');
const { Op } = require('sequelize');

const { models } = require('./../libs/sequelize');

class ProductService {

  constructor() {}

  async create(data) {
    //create a new product
    const newProduct = await models.Product.create(data);

    return newProduct;
  }

  async find(query) {

    const options = {
      include: {
        association: 'category',
        attributes: ['id', 'name', 'image']
      },
      where: {}
    }

    //pagination
    const { limit, offset } = query;
    if(limit && offset){
      options.limit = parseInt(limit);
      options.offset = parseInt(limit * (offset - 1));
    }else{
      // options.limit = 2;
      // options.offset = 0;
    }

    //optional params - filter by price
    const { price } = query;
    if(price){
      options.where.price = price;
    }

    //optional params - range by price
    const { price_min, price_max } = query;
    if(price_min && price_max){
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      }
    }

    //find all products
    const response = await models.Product.findAll(options);

    //find all products
    // const response = await models.Product.findAll({
    //   // attributes: { exclude: ['createAt'] },
    //   include: {
    //     association: 'category',
    //     attributes: ['id', 'name', 'image']
    //   },
    //   limit: 0,
    //   offset: 0
    // });

    if(response.length === 0) throw boom.notFound('Products do not exist');

    return response;
  }

  async findOne(id) {
    //create response with sequelize
    const product = await models.Product.findByPk(id);

    if(!product){
      throw boom.notFound('Product not found');
    }

    //send response
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const response = await product.update(changes);
    console.log("response to update: ", response);
    return response;
  }

  async delete(id) {
    //find user
    const product = await this.findOne(id);

    const response = await product.destroy();
    console.log("response to delete: ", response);
    return id;
  }

}

module.exports = ProductService;

const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');
const ProductService = require('./product.service');
const productService = new ProductService();

class OrderService {

  constructor() {}

  async create(data) {
    //create a new category
    const newOrder = await models.Order.create(data);

    return newOrder;
  }

  async find() {
    //find all categories
    const response = await models.Order.findAll({
      // include: ['products']
      //Es mucha data para mostrarla
    });

    if(response.length === 0) throw boom.notFound('Orders do not exist');

    return response;
  }

  async findOne(id) {
    //create response with sequelize
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });

    if(!order){
      throw boom.notFound('Order not found');
    }

    //send response
    return order;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const response = await order.update(changes);
    console.log("response to update: ", response);
    return response;
  }

  async delete(id) {
    //find user
    const order = await this.findOne(id);

    const response = await order.destroy();
    console.log("response to delete: ", response);
    return id;
  }

  //======   ORDER-PRODUCT ======
  async addItem(data) {
    console.log("data en createOrderProduct: ", data);

    const order = await this.findOne(data.orderId);

    const product = await productService.findOne(data.productId);

    //create a new category
    const newOrderProduct = await models.OrderProduct.create(data);

    return newOrderProduct;
  }

}

module.exports = OrderService;

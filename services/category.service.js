const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class CategoryService {

  constructor() {}

  async create(data) {
    //create a new category
    const newCategory = await models.Category.create(data);

    return newCategory;
  }

  async find() {
    //find all categories
    const response = await models.Category.findAll({
      // include: ['products']
      //Es mucha data para mostrarla
    });

    if(response.length === 0) throw boom.notFound('Categories do not exist');

    return response;
  }

  async findOne(id) {
    //create response with sequelize
    const category = await models.Category.findByPk(id, {
      include: [ 'products' ]
    });

    if(!category){
      throw boom.notFound('Category not found');
    }

    //send response
    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const response = await category.update(changes);
    console.log("response to update: ", response);
    return response;
  }

  async delete(id) {
    //find user
    const category = await this.findOne(id);

    const response = await category.destroy();
    console.log("response to delete: ", response);
    return id;
  }

}

module.exports = CategoryService;

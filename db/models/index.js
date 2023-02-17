//Se definen los modelos
const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Product, ProductSchema } = require('./product.model');
const { Category, CategorySchema } = require('./category.model');
const { Order, OrderSchema } = require('./order.model');
const { OrderProduct, OrderProductSchema } = require('./order-product.model');

function setupModels(sequelize) {
    //Van los demas modelos
    User.init(UserSchema, User.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));
    Category.init(CategorySchema, Category.config(sequelize));
    Order.init(OrderSchema, Order.config(sequelize));
    OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

    //Ejecutar asociaciones
    Customer.associate(sequelize.models);
    User.associate(sequelize.models);
    Product.associate(sequelize.models);
    Category.associate(sequelize.models);
    Order.associate(sequelize.models);
}

//exportamos el setup
module.exports = setupModels;
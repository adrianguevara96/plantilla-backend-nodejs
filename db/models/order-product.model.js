//Agregamos sequelize
const { Model, DataTypes, Sequelize } = require('sequelize');

const { ORDER_TABLE } = require('./order.model');
const { PRODUCT_TABLE } = require('./product.model')

//nombre de la tabla en la bd
const ORDER_PRODUCT_TABLE = 'orders_products';

//schema de la estructura de la bd
const OrderProductSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    createAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    },
    amount: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    //asociaciones
    orderId: {
        field: 'order_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: ORDER_TABLE,
            key: 'id'
        },
        // onUpdate: 'CASCADE',
        // onDelete: 'SET NULL'
    },
    productId: {
        field: 'product_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: PRODUCT_TABLE,
            key: 'id'
        },
        // onUpdate: 'CASCADE',
        // onDelete: 'SET NULL'
    }
}

class OrderProduct extends Model {
    static associate(models){
        //associate

    }

    //para hacer conexion
    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_PRODUCT_TABLE, //tabla
            modelName: 'OrderProduct', //mismo nombre de la clase
            timestamps: false
        }
    }
}

module.exports = { ORDER_PRODUCT_TABLE, OrderProductSchema, OrderProduct }



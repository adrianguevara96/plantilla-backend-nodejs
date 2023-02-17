//Agregamos sequelize
const { Model, DataTypes, Sequelize } = require('sequelize');

//relacion
const { CUSTOMER_TABLE } = require('./customer.model');

//nombre de la tabla en la bd
const ORDER_TABLE = 'orders';

//schema de la estructura de la bd
const OrderSchema = {
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
    //virtual
    // total : {
    //     type: DataTypes.VIRTUAL,
    //     get() {
    //         if(this.items.length > 0) {
    //             return this.items.reduce( (total, item) => {
    //                 return total + ( item.price * item.OrderProduct.amount );
    //             }, 0);
    //         };
    //         return 0;
    //     }
    // },
    //asociaciones
    customerId: {
        field: 'customer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: CUSTOMER_TABLE,
            key: 'id'
        }
    }
}

class Order extends Model {
    static associate(models){
        //associate

        //A order belongs to a customer
        this.belongsTo(models.Customer, {as: 'customer'});
        //A order belongs to many products
        this.belongsToMany(models.Product, {
            as: 'items',
            through: models.OrderProduct,
            foreignKey: 'orderId',
            otherKey: 'productId'
        })
    }

    //para hacer conexion
    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_TABLE, //tabla
            modelName: 'Order', //mismo nombre de la clase
            timestamps: false
        }
    }
}

module.exports = { ORDER_TABLE, OrderSchema, Order }



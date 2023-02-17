//Agregamos sequelize
const { Model, DataTypes, Sequelize } = require('sequelize');

//relacion
const { CATEGORY_TABLE } = require('./category.model');

//nombre de la tabla en la bd
const PRODUCT_TABLE = 'products';

//schema de la estructura de la bd
const ProductSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    price: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    description: {
        allowNull: true,
        type:DataTypes.STRING
    },
    image: {
        allowNull: false,
        type: DataTypes.STRING
    },
    createAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    },
    //asociaciones
    categoryId: {
        field: 'category_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: CATEGORY_TABLE,
            key: 'id'
        }
    }
}

class Product extends Model {
    static associate(models){
        //associate

        //A product belongs to an user
        this.belongsTo(models.Category, {as: 'category'});
    }

    //para hacer conexion
    static config(sequelize) {
        return {
            sequelize,
            tableName: PRODUCT_TABLE, //tabla
            modelName: 'Product', //mismo nombre de la clase
            timestamps: false
        }
    }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product }



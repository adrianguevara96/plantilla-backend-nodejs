//Agregamos sequelize
const { Model, DataTypes, Sequelize } = require('sequelize');

//nombre de la tabla en la bd
const CATEGORY_TABLE = 'categories';

//schema de la estructura de la bd
const CategorySchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
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
}

class Category extends Model {
    static associate(models){
        //associate

        //A category has many products
        this.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'categoryId'
        });
    }

    //para hacer conexion
    static config(sequelize) {
        return {
            sequelize,
            tableName: CATEGORY_TABLE, //tabla
            modelName: 'Category', //mismo nombre de la clase
            timestamps: false
        }
    }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category }



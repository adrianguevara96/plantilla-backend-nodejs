//Agregamos sequelize
const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model')

//nombre de la tabla en la bd
const CUSTOMER_TABLE = 'customers';

//schema de la estructura de la bd
const CustomerSchema = {
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
    lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'last_name'
    },
    phone: {
        allowNull: true,
        type: DataTypes.STRING
    },
    createAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    },
    //asociaciones
    userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        // onUpdate: 'CASCADE',
        // onDelete: 'SET NULL'
    }
}

class Customer extends Model {
    static associate(models){
        //associate

        //A customer belongs to an user
        this.belongsTo(models.User, {as: 'user'});
        this.hasMany(models.Order, {
            as: 'orders',
            foreignKey: 'customerId'
        });
    }

    //para hacer conexion
    static config(sequelize) {
        return {
            sequelize,
            tableName: CUSTOMER_TABLE, //tabla
            modelName: 'Customer', //mismo nombre de la clase
            timestamps: false
        }
    }
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer }



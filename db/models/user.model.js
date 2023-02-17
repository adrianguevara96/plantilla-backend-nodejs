//Agregamos sequelize
const { Model, DataTypes, Sequelize } = require('sequelize');

//nombre de la tabla en la bd
const USER_TABLE = 'users';

//schema de la estructura de la bd
const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'customer'
    },
    createAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    }
}

class User extends Model {
    static associate(models){
        //associate

        //A User has one a customer
        this.hasOne(models.Customer, {as: 'customer', foreignKey: 'userId'});
    }

    //para hacer conexion
    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE, //tabla
            modelName: 'User', //mismo nombre de la clase
            timestamps: false
        }
    }
}

module.exports = { USER_TABLE, UserSchema, User }



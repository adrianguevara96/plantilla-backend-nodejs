const boom = require('@hapi/boom');

//bd connection
// const getConnection = require('../../libs/postgres');

//bd pool connection
// const pool = require('../../libs/postgres.pool')

//bd sequelize connection
const sequelize = require('./../libs/sequelize');

const { models } = require('./../libs/sequelize');

class UsersService {

  constructor() {
    //se inicializa el array de usuarios vacio
    // this.users = [];

    //inicializamos el pool de la bd
    // this.pool = pool;

    //por si llega a dar un error, que lo presente.
    // this.pool.on('error', (err) => console.error(err));
  }

  async create(data) {
    //create a query
    // const query = `INSERT INTO USERS(name, lastname, address) VALUES('${data.name}', '${data.lastname}', '${data.address}')`;

    //create a response
    // const response = await this.pool.query(query);

    //send response
    // if(response.rowCount > 0) return data;

    //=== Create with sequelize ===
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    //create query
    // const query = 'SELECT * FROM USERS';

    // Con pool
    // const response = await this.pool.query(query);
    
    // Con sequelize para visualizar la data y la metadata
    // const [data, metadata] = await sequelize.query(query);

    // Con sequelize para enviar la data
    // const [data] = await sequelize.query(query);

    //Ahora con los metodos propios de sequelize
    const response = await models.User.findAll({
      include: ['customer']
    });

    console.log("users: ", response.length)

    if(response.length === 0) throw boom.notFound('Users do not exist');

    return response;
  }

  async findOne(id) {
    //create a query
    // const query = `SELECT * FROM USERS WHERE ID = ${id}`;

    //create response con pool
    // const response = await this.pool.query(query);

    // if(response.rows.length === 0){
    //   throw boom.notFound('User not found');
    // }

    //create response with sequelize
    const user = await models.User.findByPk(id);

    if(!user){
      throw boom.notFound('User not found');
    }

    //send response
    return user;
  }

  async update(id, changes) {
    // //find user
    // const user = await this.findOne(id);

    // if(user.length === 0) throw boom.notFound('User not found');

    // //user to update
    // const userUpdate = {
    //   ...user[0],
    //   ...changes
    // };

    // //create query to update user
    // const query = `UPDATE USERS SET NAME='${userUpdate.name}', LASTNAME='${userUpdate.lastname}', ADDRESS='${userUpdate.address}' WHERE ID = ${id}`

    // //create response
    // const response = await this.pool.query(query);

    // //send response
    // if(response.rowCount > 0) return userUpdate;
    const user = await this.findOne(id);
    const response = await user.update(changes);
    console.log("response to update: ", response);
    return response;
  }

  async delete(id) {

    // //find user
    // const user = await this.findOne(id);

    // if(user.length === 0) throw boom.notFound('User not found');

    // //create query to delete user
    // const query = `DELETE FROM USERS WHERE ID = ${id}`

    // //create response
    // const response = await this.pool.query(query);

    // //send response
    // if(response.rowCount > 0) return user;

    const user = await this.findOne(id);
    const response = await user.destroy();
    console.log("response to delete: ", response);
    return id;
  }

}

module.exports = UsersService;

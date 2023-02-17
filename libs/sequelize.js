const { Sequelize } = require('sequelize');

//config
const { config } = require('./../config/config');
const setupModels = require('./../db/models')

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


//connection with postgres
const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: true,
    ssl: {
        rejectUnauthorized: false
    }
});

//connection with mysql
// const sequelize = new Sequelize(URI, {
//     dialect: 'mysql',
//     logging: true,
// });

setupModels(sequelize);

//sincronizacion, va a tomar los modelos y va a crear las estructuras de las tablas
// sequelize.sync();

module.exports = sequelize;
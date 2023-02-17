const { Pool } = require('pg');

//config
const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


// const pool = new Pool({
//     host: 'localhost', //como lo tenemos corriendo en docker
//     port: 5432,
//     user: 'root',
//     password: 'root',
//     database: 'my_store'
// });

const pool = new Pool({ connectionString: URI });

module.exports = pool;


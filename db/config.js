const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}/${config.dbName}`;
// const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// const URI = `postgres://root:ogg2xkf4oF2L1uFTdhkdvOCRIv6yaTfX@dpg-cfn5c8cgqg415e09gdc0-a.oregon-postgres.render.com/my_store_f60z`
console.log("URI: ", URI)

module.exports = { 
    development: {
        url: URI,
        // dialect: 'mysql'
        dialect: 'postgres',
        // keepAlive:true,
    },
    production: {
        url: URI,
        // dialect: 'mysql'
        dialect: 'postgres'
    }
 }
//  postgres://root:ogg2xkf4oF2L1uFTdhkdvOCRIv6yaTfX@dpg-cfn5c8cgqg415e09gdc0-a.oregon-postgres.render.com/my_store_f60z
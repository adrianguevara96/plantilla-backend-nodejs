const { Client } = require('pg');

async function getConnection(){
    const client = new Client({
        host: 'localhost', //como lo tenemos corriendo en docker
        port: 5432,
        user: 'root',
        password: 'root',
        database: 'my_store'
    });
    await client.connect();
    return client;
}

module.exports = getConnection;


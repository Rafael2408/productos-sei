const { Pool } = require('pg')

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     password: 'Salsa123',
//     database: 'productos-sei',
//     port: '5433'
// })
const pool = new Pool({
    user: 'dilacrush',
    host: 'csoft-sei-db.postgres.database.azure.com',
    password: 'rafa1234*',
    database: 'productos-sei',
    port: '5432',
    ssl: {
        rejectUnauthorized: false,
    }
})


module.exports = pool;
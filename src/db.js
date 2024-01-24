const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'Salsa123',
    database: 'productos-sei',
    port: '5433'
})

// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT,
//     ssl: {
//         rejectUnauthorized: false,
//     }
// })



module.exports = pool;
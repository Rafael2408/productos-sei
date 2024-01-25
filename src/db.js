const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '1233',
    database: 'productos-sei',
    port: '5432'
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
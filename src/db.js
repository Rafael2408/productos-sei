const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'Salsa123',
    database: 'productos-sei',
    port: '5433'
})

module.exports = pool;
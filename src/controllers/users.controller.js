const pool = require('../db')

const getUsers = async (req, res) => {
    try {
        const response = await pool.query(`
            SELECT usu_nombre, usu_correo, rol_nombre
            FROM usuarios u, rol r
            WHERE u.rol_id = r.rol_id
        `)
        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getUsers
}
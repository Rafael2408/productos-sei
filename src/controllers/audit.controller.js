const pool = require('../db')

const getAllAudit = async ( req, res ) => {
    try {
        const response = await pool.query(`
        SELECT a.aud_id, u.usu_nombre, a.aud_accion, a.aud_tabla , a.aud_fecha
        FROM auditoria a, usuarios u
        WHERE a.usu_id = u.usu_id`)
        console.log(response.rows)
        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllAudit
}
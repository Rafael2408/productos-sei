const pool = require('../db')

const getAllAudit = async ( req, res ) => {
    try {
        const response = await pool.query(`         
            SELECT a.aud_id, u.usu_nombre, r.rol_nombre, a.aud_accion, a.aud_tabla , a.aud_fecha
            FROM auditoria a, usuarios u, rol r
            WHERE a.usu_id = u.usu_id AND u.rol_id = r.rol_id
        `)
        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createDeleteOfProduct = async (req, res) => {
    try {
        const { id } = req.params
        const response = await pool.query(`
            INSERT INTO auditoria(usu_id, aud_accion, aud_tabla, aud_fecha)
            VALUES($1, 'DELETE', 'USUARIOS', CURRENT_TIMESTAMP AT TIME ZONE 'America/Guayaquil')
        `, [id])
        res.json(`Data inserted in AUDITORIA successfully`)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllAudit,
    createDeleteOfProduct
}
const pool = require('../db')

const getUsers = async (req, res) => {
    try {
        const response = await pool.query(`
            SELECT usu_id, usu_nombre, usu_correo, rol_nombre, usu_active, u.rol_id
            FROM usuarios u, rol r
            WHERE u.rol_id = r.rol_id
            ORDER BY usu_id
        `)
        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getUserById = async (req, res) => {
    const id = req.params.id
    try {
        const response = await pool.query(`
            SELECT usu_id, usu_nombre, rol_nombre, usu_correo, usu_active
            FROM usuarios u, rol r
            WHERE u.rol_id = r.rol_id
            AND usu_id = $1
        `, [id])
        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateUserActive = async (req, res) => {
    const { usu_correo, usu_active } = req.body
    try {
        const response = await pool.query(`
            UPDATE usuarios SET usu_active = $1
            WHERE usu_correo = $2
        `, [usu_active, usu_correo])
        res.json({
            message: 'Usuario actualizado',
            body: {
                user: { usu_active }
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message,
            data: {usu_active, usu_correo}
        })
    }
}

const updateUserRole = async (req, res) => {
    const { rol_id, usu_id } = req.body
    try {
        await pool.query(`
            UPDATE usuarios SET rol_id = $1
            WHERE usu_id = $2
        `, [rol_id, usu_id])
        res.json({
            message: 'Usuario actualizado',
            body: {
                user: { rol_id }
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



module.exports = {
    getUsers,
    getUserById,
    updateUserActive,
    updateUserRole
}
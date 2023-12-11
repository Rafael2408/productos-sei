const pool = require('../db')
const bcrypt = require('bcryptjs')
const { createAccessToken } = require('../libs/jwt.js')


const register = async (req, res) => {
    const { usu_nombre, usu_correo, usu_password } = req.body
    try {
        
        const passwordHash = await bcrypt.hash(usu_password, 10) // 10 es el número de veces que se ejecuta el algoritmo

        const response = await pool.query(`
        INSERT INTO usuarios (usu_nombre, usu_correo, usu_password, rol_id) VALUES ($1, $2, $3, 4)
        RETURNING *
        `, [usu_nombre, usu_correo, passwordHash])

        //Generacion del token
        const token = await createAccessToken({ id: response.rows[0].usu_id })

        res.cookie('token', token)
        res.json({
            id: response.rows[0].usu_id,
            nombre: response.rows[0].usu_nombre,
            correo: response.rows[0].usu_correo,
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const login = async (req, res) => {
    const { usu_correo, usu_password } = req.body

    try {
        const userFound = await pool.query(`SELECT * FROM usuarios WHERE usu_correo = $1`, [usu_correo])
        if(!userFound.rows[0]) return res.status(400).json({ message: 'Usuario no encontrado' })

        const isMatch = await bcrypt.compare(usu_password, userFound.rows[0].usu_password)
        if(!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' })

        //Generacion del token
        const token = await createAccessToken({ id: userFound.rows[0].usu_id })

        res.cookie('token', token)
        res.json({
            id: userFound.rows[0].usu_id,
            nombre: userFound.rows[0].usu_nombre,
            correo: userFound.rows[0].usu_correo,
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const logout = (req, res) => {
    res.cookie('token', '', { 
        expires: new Date(0)
    })
    return res.status(200).json({ message: 'Logout successful' })
}

const profile = async (req, res) => {
    const userFound = await pool.query(`SELECT * FROM usuarios WHERE usu_id = $1`, [req.user.id])
    if(!userFound) return res.status(400).json({ message: 'Usuario no encontrado' })

    return res.json({
        id: userFound.rows[0].usu_id,
        nombre: userFound.rows[0].usu_nombre,
        correo: userFound.rows[0].usu_correo
    })
}

module.exports = {
    register,
    login,
    logout,
    profile
}
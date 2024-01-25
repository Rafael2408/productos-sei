const pool = require('../db')
const bcrypt = require('bcryptjs')
const { createAccessToken } = require('../libs/jwt.js')
const jwt = require('jsonwebtoken')
const { TOKEN_SECRET } = require('../config.js')
const maxTries = 3

const register = async (req, res) => {
    const { usu_nombre, usu_correo, usu_password } = req.body
    try {
        
        const passwordHash = await bcrypt.hash(usu_password, 10) // 10 es el número de veces que se ejecuta el algoritmo

        const response = await pool.query(`
        INSERT INTO usuarios (usu_nombre, usu_correo, usu_password, rol_id) VALUES ($1, $2, $3, 4)
        RETURNING *
        `, [usu_nombre, usu_correo, passwordHash])

        //Generacion del token
       const token = await createAccessToken({ 
            usu_id: response.rows[0].usu_id,
            usu_rol: response.rows[0].rol_id
        })

        

        res.cookie('token', token)
        res.json({
            usu_id: response.rows[0].usu_id,
            usu_nombre: response.rows[0].usu_nombre,
            usu_correo: response.rows[0].usu_correo,
            usu_rol: 4
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const blockAccount = async ( usu_correo ) => {
    try {
        const res = await pool.query(
            `UPDATE usuarios SET usu_active = false where usu_correo = $1 RETURNING *`, 
            [usu_correo]
        )
        return res.rows[0]
    } catch (error) {
        console.log(error.message)
    }
}

const updateTries = async (usu_correo, tries) => {
    try {
        const res = await pool.query(
            `UPDATE usuarios SET usu_tries = $1 where usu_correo = $2 RETURNING *`,
            [tries, usu_correo]
        )
        return res.rows[0]
    } catch (error) {
        console.log(error.message)
    }
}

const login = async (req, res) => {
    const { usu_correo, usu_password } = req.body

    try {
        const userFound = await pool.query(`
            SELECT usu_id, usu_nombre, usu_correo ,usu_password, u.rol_id, usu_active, usu_tries FROM usuarios u, rol r
            WHERE u.rol_id = r.rol_id
            AND u.usu_correo = $1
        `, [usu_correo])

        if (!userFound.rows[0]) return res.status(400).json({ message: 'Usuario no encontrado' })

        if (!userFound.rows[0].usu_active) {
            return res.status(400).json({ message: 'El usuario está inactivo. Por favor, contacta con el administrador.' });
        }



        const isMatch = await bcrypt.compare(usu_password, userFound.rows[0].usu_password)
        if (!isMatch) {
            const tries = userFound.rows[0].usu_tries + 1
            const usu_correo = userFound.rows[0].usu_correo
            updateTries(usu_correo, tries)
            if(tries >= maxTries) {
                await blockAccount(usu_correo)
                updateTries(usu_correo, 0)
                return res.status(400).json({ message: 'Cuenta bloqueada. Contacta con el administrador.' })
            }
            return res.status(400).json({ message: `Contraseña incorrecta. Tienes ${maxTries - tries} intentos restantes.` })
        }



        updateTries(usu_correo, 0)
        // Generacion del token
        const token = await createAccessToken({
            usu_id: userFound.rows[0].usu_id,
            usu_rol: userFound.rows[0].rol_id
        })

        res.cookie('token', token)
        res.json({
            id: userFound.rows[0].usu_id,
            nombre: userFound.rows[0].usu_nombre,
            correo: userFound.rows[0].usu_correo,
            rol: userFound.rows[0].rol_id,
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error.message)
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

const verifyToken = async (req, res) => {
    const {token} = req.cookies

    if(!token) return res.status(401).json({ message: 'No autorizado' })

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if(err) return res.status(401).json({ message: 'No autorizado' })

        const userFound = await pool.query(`
            SELECT * FROM USUARIOS
            WHERE usu_id = $1
        `, [user.usu_id])
        if(!userFound.rows.length) return res.status(401).json({message: "No Autorizado", user:null})
        
        return res.json({
            user_id: userFound.rows[0].usu_id,
            usu_nombre: userFound.rows[0].usu_nombre,
            usu_correo: userFound.rows[0].usu_correo,
            rol_id: userFound.rows[0].rol_id
        })
    })
}

module.exports = {
    register,
    login,
    logout,
    profile, 
    verifyToken
}
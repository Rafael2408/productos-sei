const pool = require('../db')

const validateSchema = (schema) => async (req, res, next) =>{
    try {        
        await schema.parse(req.body)

        next()
    } catch (error) {
        return res.status(400).json({error: error.errors.map(error => error.message)})
    }
}

const checkEmail = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM usuarios WHERE usu_correo = $1`, [req.query.usu_correo])
        if (result.rows.length > 0) {
            return res.status(400).json({ message: 'El correo ya se encuentra registrado' })
        } else {
            return res.status(200).json({ message: 'El correo no está registrado' })
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = {validateSchema, checkEmail}
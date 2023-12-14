const pool = require('../db')

const getAllProducts = async (req, res) => {
    try {
        const response = await pool.query(`
            SELECT pro_id, pro_nombre, pro_descripcion, pro_precio, pro_cantidad, u.usu_nombre, c.cat_nombre
            FROM productos p, usuarios u, categoria c
            WHERE p.usu_id = u.usu_id AND p.cat_id = c.cat_id
        `)
        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params
        const response = await pool.query(`SELECT * FROM productos WHERE pro_id = $1`, [id])
        res.json(response.rows[0])
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createProduct = async (req, res) => {
    try {
        const { pro_nombre, pro_descripcion, pro_precio, pro_cantidad, usu_id, cat_id } = req.body
        await pool.query(`
        INSERT INTO productos (pro_nombre, pro_descripcion, pro_precio, pro_cantidad, usu_id, cat_id) 
        VALUES ($1, $2, $3, $4, $5, $6)
        `, [pro_nombre, pro_descripcion, pro_precio, pro_cantidad, usu_id, cat_id])
        res.json({
            message: 'Producto creado exitosamente',
            body: {
                producto: { pro_nombre, pro_descripcion, pro_precio, pro_cantidad, usu_id, cat_id }
            }
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try{
        const { id } = req.params
        await pool.query(`DELETE FROM productos WHERE pro_id = $1`, [id])
        res.json(`Producto ${id} eliminado exitosamente`)

    }catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateProduct = async (req, res) => {
    res.send("updating a product");
}

module.exports = { 
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
};
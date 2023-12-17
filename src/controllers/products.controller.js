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
        res.status(404).json({ message: "Product not found" })
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
    try {
        const { id } = req.params
        await pool.query(`DELETE FROM productos WHERE pro_id = $1`, [id])
        res.json(`Producto ${id} eliminado exitosamente`)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { pro_nombre, pro_descripcion, pro_precio, pro_cantidad, usu_id, cat_id } = req.body
        await pool.query(`
            UPDATE public.productos
            SET pro_nombre=$1, pro_descripcion=$2, pro_precio=$3, pro_cantidad=$4, usu_id=$5, cat_id=$6
            WHERE pro_id=$7;
        `, [pro_nombre, pro_descripcion, pro_precio, pro_cantidad, usu_id, cat_id, id])
        res.json(`Producto ${id} actualizado exitosamente`)
    } catch (error) {
        res.json(`Error: ${error.message}`)
    }
}





const getProductsPurchased = async (req, res) => {
    try {
        const response = await pool.query(`
            SELECT u.usu_nombre, p.pro_nombre, prodcom_cantidad, p.pro_descripcion, prodcom_fecha
            FROM productos_comprados pc, usuarios u, productos p
            WHERE u.usu_id = pc.usu_id AND p.pro_id = pc.pro_id
        `);
        res.status(200).json(response.rows);
    } catch (error) {
        res.json(error.message)
    }
}

const getProductPurchasedById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query(`
            SELECT p.pro_nombre, pc.prodcom_cantidad, pc.prodcom_fecha 
            FROM productos_comprados pc, productos p, usuarios u
            WHERE p.pro_id = pc.pro_id AND u.usu_id = pc.usu_id 
            AND pc.usu_id = $1;
        `, [id]);
        res.json(response.rows);
    } catch (error) {
        res.json(error.message)
    }
}

const createProductPurchased = async (req, res) => {
    try {
        const { usu_id, pro_id, prodcom_cantidad } = req.body;
        const response = await pool.query(`
            INSERT INTO productos_comprados(
            usu_id, pro_id, prodcom_cantidad, prodcom_fecha)
            VALUES ($1, $2, $3, NOW());
        `, [usu_id, pro_id, prodcom_cantidad]);
        res.json({
            message: 'Product Purchased created successfully',
            body: {
                product_purchased: response.rows[0]
            }
        })
    } catch (error) {
        res.json(error.message)
    }
}

const updateProductStock = async (req, res) => {
    try {
        const { pro_id, prodcom_cantidad } = req.body;
        const response = await pool.query(`
            UPDATE productos SET pro_cantidad = pro_cantidad - $1 WHERE pro_id = $2;
        `, [prodcom_cantidad, pro_id]);
        res.json('Product Stock Updated Successfully');
    } catch (error) {
        res.json(error.message)
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,

    getProductsPurchased,
    getProductPurchasedById,
    createProductPurchased,
    updateProductStock
};
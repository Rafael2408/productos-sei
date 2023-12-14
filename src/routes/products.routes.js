const { Router } = require('express');
const { 
    getAllProducts, 
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,
} = require('../controllers/products.controller');
const authRequired = require('../middlewares/validateToken');
const {validateSchema} = require('../middlewares/validateSchema.middleware');
const { createProductSchema } = require('../schemas/product.schema');

const router = Router();

router.get('/products', authRequired, getAllProducts);

router.get('/products/:id', authRequired, getProductById);

router.post('/products', authRequired, validateSchema(createProductSchema), createProduct);

router.delete('/products', authRequired, deleteProduct);

router.put('/products', authRequired, updateProduct);

module.exports = router;
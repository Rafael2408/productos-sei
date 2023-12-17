const { Router } = require('express');
const { 
    getAllProducts, 
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,


    getProductsPurchased,
    getProductPurchasedById,
    createProductPurchased,
    updateProductStock,
} = require('../controllers/products.controller');

const authRequired = require('../middlewares/validateToken');
const {validateSchema} = require('../middlewares/validateSchema.middleware');
const { createProductSchema } = require('../schemas/product.schema');

const router = Router();

router.get('/products', authRequired, getAllProducts);
router.get('/products/:id', authRequired, getProductById);
router.post('/products', authRequired, validateSchema(createProductSchema), createProduct);
router.delete('/products/:id', authRequired, deleteProduct);
router.put('/products/:id', authRequired, validateSchema(createProductSchema),updateProduct);
router.put('/products-stock/:id', authRequired, updateProductStock);

router.get('/products-purchased', authRequired, getProductsPurchased);
router.get('/products-purchased/:id', authRequired, getProductPurchasedById);
router.post('/products-purchased', authRequired, createProductPurchased);
router.put('/products-purchased', authRequired, updateProductStock)

module.exports = router;
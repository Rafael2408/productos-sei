const { Router } = require('express');
const authRequired = require('../middlewares/validateToken');
const { getAllAudit, createDeleteOfProduct } = require('../controllers/audit.controller')

const router = Router();

router.get('/get-audit', authRequired, getAllAudit );

router.post('/create-delete-of-product/:id', authRequired, createDeleteOfProduct);

module.exports = router;
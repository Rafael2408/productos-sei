const { Router } = require('express');
const authRequired = require('../middlewares/validateToken');
const { getAllAudit } = require('../controllers/audit.controller')

const router = Router();

// router.get('/get-audit', authRequired, getAllAudit );
router.get('/get-audit', getAllAudit );

module.exports = router;
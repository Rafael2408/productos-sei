const { Router } = require('express');

const { getUsers } = require('../controllers/users.controller')
const authRequired = require('../middlewares/validateToken');

const router = Router();

router.get('/users', authRequired, getUsers);

module.exports = router;
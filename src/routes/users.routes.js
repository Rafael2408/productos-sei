const { Router } = require('express');

const { getUsers, getUserById, updateUserRole, updateUserActive } = require('../controllers/users.controller')
const authRequired = require('../middlewares/validateToken');

const router = Router();

router.get('/users', authRequired, getUsers);
router.get('/users/:id', authRequired, getUserById);
router.put('/users', authRequired, updateUserRole);
router.put('/users/active', updateUserActive);

// router.get('/users',  getUsers);
// router.get('/users/:id', getUserById);
// router.put('/users', updateUserRole);
// router.put('/users/active', updateUserActive);

module.exports = router;
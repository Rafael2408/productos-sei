const { Router } =  require('express');
const { login, register, logout, profile, verifyToken } = require('../controllers/auth.controller');
const authRequired = require('../middlewares/validateToken');
const {validateSchema, checkEmail} = require('../middlewares/validateSchema.middleware');
const {loginSchema, registerSchema} = require('../schemas/auth.schema')

const router = Router();

router.get('/validate-schema-register', (req, res, next)=> validateSchema(registerSchema)(req, res, next))
router.get('/check-email', checkEmail)

router.post('/register', validateSchema(registerSchema),register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)

router.get('/verify', verifyToken)

router.get('/profile', authRequired, profile)

module.exports = router;
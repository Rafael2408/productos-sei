const jwt = require('jsonwebtoken')
const { TOKEN_SECRET } = require('../config.js')


const authRequired = (req, res, next) => {
    const {token} = req.cookies
    if (!token) return res.status(401).json({message: 'Autorización denegada'})

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).json({message: 'Token inválido'})

        req.user = user
        next()
    })

}

module.exports = authRequired
const express = require('express');
const router = express.Router();
const { sendConfirmationEmail, getConfirmationCode } = require('../controllers/email.controller');
const { sendPasswordForget } = require('../controllers/email-send-password');

router.post('/send-email', (req, res) => {
    const { usu_correo } = req.body;
    sendConfirmationEmail(usu_correo);
    res.status(200).send('Correo de confirmación enviado');
});

router.post('/send-login-email', (req, res) => {
    const { usu_correo } = req.body;
    sendLoginEmail(usu_correo);
    res.status(200).send('Correo de confirmación enviado');
});

router.post('/send-password-forget', (req, res) => {
    const { usu_correo } = req.body;
    sendPasswordForget(usu_correo);
    res.status(200).send('Correo de confirmación enviado');
})

router.get('/get-confirmation-code', (req, res) => {
    const { usu_correo } = req.query;
    const confirmationCode = getConfirmationCode(usu_correo);
    if (confirmationCode) {
        res.status(200).json({ confirmationCode });
    } else {
        res.status(404).send('Código de confirmación no encontrado');
    }
});

module.exports = router;

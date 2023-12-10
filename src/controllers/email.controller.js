const nodemailer = require('nodemailer');

// Objeto para almacenar los códigos de confirmación
let confirmationCodes = {};

exports.sendConfirmationEmail = function (userEmail) {
    // Crear un transportador de correo
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'correos.seguridad2024@gmail.com',
            pass: 'suau rnin kcvf sltm'
        }
    });

    // Generar un código de confirmación
    let codigoConfirmacion = Math.floor(Math.random() * 1000000);

    // Guardar el código de confirmación en el objeto...
    confirmationCodes[userEmail] = codigoConfirmacion;

    // Enviar el correo electrónico
    let mailOptions = {
        from: 'correos.seguridad2024@gmail.com',
        to: userEmail,
        subject: 'Código de confirmación',
        text: `Tu código de confirmación es ${codigoConfirmacion}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
};

exports.getConfirmationCode = function (userEmail) {
    // Obtener el código de confirmación del objeto...
    let codigoConfirmacion = confirmationCodes[userEmail];

    // Devolver el código de confirmación
    return codigoConfirmacion;
};

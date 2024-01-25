const nodemailer = require('nodemailer');

// Objeto para almacenar los códigos de confirmación
let confirmationCodes = {};

exports.sendLoginEmail = function (userEmail) {
    // Crear un transportador de correo
    let transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });


    // Guardar el código de confirmación en el objeto...
    // confirmationCodes[userEmail] = codigoConfirmacion;

    currentDate = new Date();

    // Enviar el correo electrónico
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Has iniciado sesión',
        html: `<p style="font-size:20px">Has iniciado sesión en Seguridad y Productos a la hora:</p><p style="font-size:30px">
        ${currentDate}</p>
        <p>Con el correo: ${userEmail}</p>
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
};

// exports.getConfirmationCode = function (userEmail) {
//     // Obtener el código de confirmación del objeto...
//     let codigoConfirmacion = confirmationCodes[userEmail];

//     // Devolver el código de confirmación
//     return codigoConfirmacion;
// };


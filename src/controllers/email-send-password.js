const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const pool = require('../db')

// Objeto para almacenar los códigos de confirmación
let confirmationCodes = {};

const updatePassword = async(usu_correo, newPassword) =>{
    try {
        const res = await pool.query(
            `UPDATE usuarios SET usu_password = $1 where usu_correo = $2 RETURNING *`,
            [newPassword, usu_correo]
        )
        return res.rows[0]
    } catch (error) {
        console.log(error.message)
    }
}

function generarContraseña() {
    const caracteresMayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const caracteresMinusculas = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    const caracteresEspeciales = '!@#$%^&*()-_+=<>?/[]{}|';

    // Generar una letra aleatoria de un conjunto de caracteres
    function obtenerCaracteresAleatorios(conjunto) {
        const indiceAleatorio = Math.floor(Math.random() * conjunto.length);
        return conjunto.charAt(indiceAleatorio);
    }

    // Generar al menos un carácter de cada tipo
    const mayuscula = obtenerCaracteresAleatorios(caracteresMayusculas);
    const minuscula = obtenerCaracteresAleatorios(caracteresMinusculas);
    const numero = obtenerCaracteresAleatorios(numeros);
    const especial = obtenerCaracteresAleatorios(caracteresEspeciales);

    // Generar el resto de la contraseña con caracteres aleatorios
    const longitudRestante = 8 - (mayuscula.length + minuscula.length + numero.length + especial.length);
    const todosLosCaracteres = caracteresMayusculas + caracteresMinusculas + numeros + caracteresEspeciales;

    let contraseñaRestante = '';
    for (let i = 0; i < longitudRestante; i++) {
        contraseñaRestante += obtenerCaracteresAleatorios(todosLosCaracteres);
    }

    // Mezclar todos los caracteres y devolver la contraseña generada
    const contraseñaFinal = mayuscula + minuscula + numero + especial + contraseñaRestante;
    return contraseñaFinal;
}

exports.sendPasswordForget = async function (userEmail) {
    // Crear un transportador de correo
    let transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const newPassword = generarContraseña()
    const passwordHash = await bcrypt.hash(newPassword, 10)
    const response = await updatePassword(userEmail, passwordHash)


    // Enviar el correo electrónico
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Nueva contraseña',
        html: `<p style="font-size:20px">Has solicitado una nueva contraseña para Seguridad y Productos, es esta:</p><p style="font-size:30px">
        ${newPassword}</p>
        <p>Con el correo: ${newPassword}</p>
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


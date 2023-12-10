const z = require('zod')

const registerSchema = z.object({
    usu_nombre: z.string({ required_error: 'El nombre es requerido' })
        .min(3, { message: "El nombre debe tener al menos 3 caracteres" }).max(30),

    usu_correo: z.string({ required_error: 'El correo es requerido' })
        .email({ message: 'El correo no es válido' })
        .min(8, { message: 'El correo debe tener al menos 8 caracteres' }).max(50),

    usu_password: z.string({ required_error: 'La contraseña es requerida' })
        .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }).max(30),
})

const loginSchema = z.object({
    usu_correo: z.string({ required_error: 'El correo es requerido'})
        .min(8, {message: "El correo debe tener al menos 8 caracteres"}).max(50),
        
    usu_password: z.string({ required_error: 'La contraseña es requerida' })
        .min(8,{message: 'La contraseña debe tener al menos 8 caracteres'}).max(30),
})

module.exports = {
    registerSchema,
    loginSchema
}
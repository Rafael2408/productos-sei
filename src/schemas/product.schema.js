const z = require('zod');

const createProductSchema = z.object({
    pro_nombre: z.string({ required_error: 'El nombre es requerido' })
        .min(3, { message: "El nombre debe tener al menos 3 caracteres" }).max(30),

    pro_descripcion: z.string({ required_error: 'La descripción es requerida' })
        .min(3, { message: 'La descripción debe tener al menos 3 caracteres' }).max(50),

    pro_precio: z.number({ required_error: 'El precio es requerido' })
        .min(0, { message: 'El precio debe ser mayor a 0' }),

    pro_cantidad: z.number({ required_error: 'La cantidad es requerida' })
        .min(1, { message: 'El stock debe ser mayor a 0' }),
    
    usu_id: z.number({ required_error: 'El id del usuario es requerido' })
        .min(1, { message: 'El id del usuario debe ser mayor a 0' }),

    cat_id: z.number({ required_error: 'El id de la categoría es requerido' })
        .min(1, { message: 'El id de la categoría debe ser mayor a 0' })
        .max(8, { message: 'El id de la categoría debe ser menor o igual a 8' }),
})

module.exports = {
    createProductSchema,
}

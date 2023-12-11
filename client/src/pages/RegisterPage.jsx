import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

function RegisterPage() {

    const { register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();
    const { isAuthenticated, checkingEmail, emailMessage, emailConfirmation } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate('/products')
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        await checkingEmail(values.usu_correo)
        console.log(emailMessage)
        await emailConfirmation(values)
        navigate('/confirmation-code')
        // const res = await validateSchema(values)
        // console.log(res)
    })

    return (
        <form onSubmit={onSubmit}>
            <div className='mb-3'>
                <label className='form-label'>Nombre</label>
                <input
                    type='text'
                    className='form-control'
                    {...register('usu_nombre', {
                        required: 'El nombre es requerido',
                        minLength: {value: 3, message: 'El nombre debe tener al menos 3 caracteres'}
                    })}
                />
                {errors.usu_nombre && (
                    <span className='text-danger'>{errors.usu_nombre.message}</span>
                )}  
            </div>

            <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input
                    type='email'
                    className='form-control'
                    {...register('usu_correo', { 
                        required: 'El correo es requerido',
                        minLength: {value: 8, message: 'El correo debe tener al menos 8 caracteres'} 
                    })}
                    onBlur={(e) => checkingEmail(e.target.value)} // Comprueba el correo electrónico cuando el usuario deja el campo
                />
                {errors.usu_correo && (
                    <span className='text-danger'>{errors.usu_correo.message}</span>
                )}
                {emailMessage && (
                    <span className={emailMessage === 'El correo está disponible' ? 'text-success' : 'text-danger'}>
                        {emailMessage}
                    </span>
                )}

            </div>

            <div className='mb-3'>
                <label className='form-label'>Contraseña</label>
                <input
                    type='password'
                    className='form-control'
                    {...register('usu_password', { 
                        required: 'La contraseña es requerida',
                        minLength: {value: 6, message: 'La contraseña debe tener al menos 8 caracteres'}
                 })}
                />
                {errors.usu_password && (
                    <span className='text-danger'>{errors.usu_password.message}</span>
                )}
            </div>

            <div className='mb-3'>
                <label className='form-label'>Repetir Contraseña</label>
                <input
                    type='password'
                    className='form-control'
                    {...register('usu_password_repeat', { 
                        required: 'Por favor, repita la contraseña',
                        validate: value => value === watch('usu_password') || 'Las contraseñas no coinciden'
                 })}
                />
                {errors.usu_password_repeat && (
                    <span className='text-danger'>{errors.usu_password_repeat.message}</span>
                )}
            </div>

            <button type='submit' className='btn btn-primary'>
                Registrarse
            </button>
        </form>
    );
}

export default RegisterPage
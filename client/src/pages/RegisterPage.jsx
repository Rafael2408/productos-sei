import { useForm } from 'react-hook-form'
import {useAuth} from '../context/AuthContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
    const { register, handleSubmit } = useForm();
    const { signup, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(isAuthenticated)
        if(isAuthenticated) navigate('/products')
    }, [isAuthenticated])
    
    const onSubmit = handleSubmit(async(values) => {
        await signup(values)
    })
    
    return (
        <form onSubmit={onSubmit}>
            <div className='mb-3'>
                <label htmlFor='name' className='form-label'>Nombre</label>
                <input
                    type='text'
                    className='form-control'
                    {...register('usu_nombre')}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor='email' className='form-label'>Email</label>
                <input
                    type='email'
                    className='form-control'
                    {...register('usu_correo')}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor='password' className='form-label'>Contraseña</label>
                <input
                    type='password'
                    className='form-control'
                    {...register('usu_password')}
                />
            </div>

            <button type='submit' className='btn btn-primary'>
                Registrarse
            </button>
        </form>
    );
}

export default RegisterPage
import '../../styles/formstyle.css'

import ReCAPTCHA from "react-google-recaptcha";
import { SECRET_KEY_RECAPTCHA } from '../../config';
import ConfirmationCode from '../../components/ConfirmationCode';

import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'

function RegisterPage() {

    const [captchaValue, setCaptchaValue] = useState(null)
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value); // Actualiza el estado del captcha cuando el usuario lo completa
    }

    const { register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();
    const { isAuthenticated, checkingEmail, emailMessage, emailConfirmation } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate('/user')
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        await checkingEmail(values.usu_correo)
        if(emailMessage !== 'El correo está disponible') return alert('El correo ya está registrado')
        await emailConfirmation(values)
        setShowConfirmation(true)
    })

    if (showConfirmation) {
        return <ConfirmationCode />; // Retorna el componente de confirmación si showConfirmation es verdadero
    }


    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div id='registerForm'>
                <h1>Formulario de Registro</h1>
                <div className="col-6" id='FormRegister'>
                    <form onSubmit={onSubmit}>
                        <div className='mb-3'>
                            <label className='form-label'>Nombre</label>
                            <input
                                placeholder='Ingrese su nombre'
                                type='text'
                                className='form-control inputRegister'
                                {...register('usu_nombre', {
                                    required: 'El nombre es requerido',
                                    minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' }
                                })}
                            />
                            {errors.usu_nombre && (
                                <span className='text-danger'>{errors.usu_nombre.message}</span>
                            )}
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Correo Electrónico</label>
                            <input
                                placeholder='Ingrese su correo electrónico'
                                type='email'
                                className='form-control inputRegister'
                                {...register('usu_correo', {
                                    required: 'El correo es requerido',
                                    minLength: { value: 8, message: 'El correo debe tener al menos 8 caracteres' }
                                })}
                                onBlur={(e) => e.target.value!=='' && checkingEmail(e.target.value)} // Comprueba el correo electrónico cuando el usuario deja el campo
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
                                placeholder='Ingrese su contraseña'
                                type='password'
                                className='form-control inputRegister'
                                {...register('usu_password', {
                                    required: 'La contraseña es requerida',
                                    minLength: { value: 6, message: 'La contraseña debe tener al menos 8 caracteres' }
                                })}
                            />
                            {errors.usu_password && (
                                <span className='text-danger'>{errors.usu_password.message}</span>
                            )}
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Repetir Contraseña</label>
                            <input
                                placeholder='Repita su contraseña'
                                type='password'
                                className='form-control inputRegister'
                                {...register('usu_password_repeat', {
                                    required: 'Por favor, repita la contraseña',
                                    validate: value => value === watch('usu_password') || 'Las contraseñas no coinciden'
                                })}
                            />
                            {errors.usu_password_repeat && (
                                <span className='text-danger'>{errors.usu_password_repeat.message}</span>
                            )}
                        </div>
                        <ReCAPTCHA
                            sitekey={SECRET_KEY_RECAPTCHA}
                            onChange={handleCaptchaChange}
                        />
                        <button type='submit' className='btn btn-primary inputRegister'>
                            Registrarse
                        </button>
                    </form>

                    <p className='haveAcount' >¿Tienes una cuenta?
                        <Link className='links' to="/login">Iniciar Sesión</Link>
                    </p>

                </div>
            </div>
        </div> 
    );
}

export default RegisterPage
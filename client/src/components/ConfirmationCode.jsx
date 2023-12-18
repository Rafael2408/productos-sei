import React, { useState } from 'react';
import '../styles/formstyle.css'

import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getConfirmationCode } from '../api/auth'
import { useEffect } from 'react';

function ConfirmationCode() {
    const { register, handleSubmit } = useForm();
    const { signup, isAuthenticated, user } = useAuth();  // Importa la función de registro de AuthContext
    const navigate = useNavigate();

    const [attempts, setAttempts] = useState(3); // Agrega un estado para los intentos

    const onSubmit = async (data) => {
        try {
            const storedCode = await getConfirmationCode(user.usu_correo);
            console.log(storedCode)
            if (data.confirmationCode == storedCode.confirmationCode) {
                await signup(user, navigate);
            } else {
                setAttempts(attempts - 1); // Reduce los intentos si el código es incorrecto
                if (attempts >= 1) {
                    alert(`Código de confirmación incorrecto. Te quedan ${attempts - 1} intentos.`);
                }
                else{
                    alert(`Tu correo ha sido betado, trata de registrarte con un nuevo correo.`);
                }
            }
        } catch (error) {
            console.error("Error en onSubmit: ", error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) navigate('/user');
    }, [isAuthenticated]);

    return (
        <>
            <div>
                <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{ height: "100vh" }}
                    
                >
                    <div id="confirmationForm">
                        <h2>Te hemos enviado un código de confirmación al correo</h2>
                        <h2>{user && user.usu_correo}</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className='formCode'>
                            <input
                                className="form-control inputs"
                                type="number"
                                id='inputConfirmCode'
                                {...register('confirmationCode')}
                                placeholder="Ingrese el código de confirmación"
                            />
                            <br />
                            <button className='btn btn-primary' type="submit">Confirmar</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConfirmationCode;

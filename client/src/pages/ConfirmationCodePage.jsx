import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getConfirmationCode } from '../api/auth'
import { useEffect } from 'react';

function ConfirmationCodePage() {
    const { register, handleSubmit } = useForm();
    const { signup, isAuthenticated, user } = useAuth();  // Importa la función de registro de AuthContext
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const storedCode = await getConfirmationCode(user.usu_correo);
            // console.log(storedCode, data.confirmationCode); momento que imprimía el código
            if (data.confirmationCode == storedCode.confirmationCode) {
                // Código de confirmación correcto
                await signup(user);
                navigate('/products');
            } else {
                // Código de confirmación incorrecto
                alert('Código de confirmación incorrecto');
            }
        } catch (error) {
            console.error("Error en onSubmit: ", error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) navigate('/products');
    }, [isAuthenticated]);

    return (
        <>
            <h1>Te hemos enviado un correo a {user && user.usu_correo}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register('confirmationCode')}
                    placeholder="Ingrese el código de confirmación"
                />
                <br />
                <button type="submit">Confirmar</button>
            </form>
        </>
    );
}

export default ConfirmationCodePage;

import axios from './axios'

export const validateShemaRegister = (user) => axios.get(`/validate-schema-register`, user)

export const registerRequest = (user) => axios.post(`/register`, user)

export const loginRequest = (user) => axios.post(`/login`, user)


export const verifyTokenRequest = () => axios.get('/verify')

export const checkEmail = async (email) => {
    try {
        const response = await axios.get(`/check-email`, { params: { usu_correo: email } });
        if (response.status === 200) {
            return('El correo está disponible');
        }
        else if (response.status === 204)return ('El correo ya se encuentra registrado')
    } catch (error) {
        if (error.response && error.response.status === 204) {
            return('El correo ya se encuentra registrado');
        }
    }
}

export const emailRequest = (usu_correo) => {
    return axios.post(`/send-email`, { usu_correo: usu_correo })
        .then(response => response.data)
        .catch(error => {
            console.error("Hubo un error al enviar el correo electrónico: ", error);
        });
}

export const loginEmailRequest = (usu_correo) => {
    return axios.post(`/send-login-email`, { usu_correo: usu_correo })
        .then(response => response.data)
        .catch(error => {
            console.error("Hubo un error al enviar el correo electrónico: ", error);
        });
}

export const getConfirmationCode = (usu_correo) => {
    return axios.get(`/get-confirmation-code`, { params: { usu_correo: usu_correo } })
        .then(response => response.data)
        .catch(error => {
            console.error("Hubo un error al obtener el código de confirmación: ", error);
        });
}

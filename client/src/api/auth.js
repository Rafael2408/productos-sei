import axios from 'axios'

const API = 'http://localhost:4000/api'

export const validateShemaRegister = (user) => axios.get(`${API}/validate-schema-register`, user)

export const registerRequest = (user) => axios.post(`${API}/register`, user)

export const checkEmail = async (email) => {
    try {
        const response = await axios.get(`${API}/check-email`, { params: { usu_correo: email } });
        if (response.status === 200) {
            return('El correo está disponible');
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return('El correo ya se encuentra registrado');
        }
    }
}

export const emailRequest = (usu_correo) => {
    return axios.post(`${API}/send-email`, { usu_correo: usu_correo })
        .then(response => response.data)
        .catch(error => {
            console.error("Hubo un error al enviar el correo electrónico: ", error);
        });
}

export const getConfirmationCode = (usu_correo) => {
    return axios.get(`${API}/get-confirmation-code`, { params: { usu_correo: usu_correo } })
        .then(response => response.data)
        .catch(error => {
            console.error("Hubo un error al obtener el código de confirmación: ", error);
        });
}

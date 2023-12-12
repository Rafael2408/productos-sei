import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, emailRequest, validateShemaRegister, checkEmail } from '../api/auth'

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [emailMessage, setEmailMessage] = useState(null);
    const [errors, setErrors] = useState([]);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error)
            
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log(res)
        } catch (error) {
            console.log(error)
            setErrors(error.response.data)
        }
    }

    const emailConfirmation = async (user) => {
        try {
            await emailRequest(user.usu_correo)
            setUser(user)
            // setIsAuthenticated(true)
        } catch (error) {
            console.log(error)
        }
    }

    const validateSchema = async (user) => {
        try {
            const res = await validateShemaRegister(user)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const checkingEmail = async (usu_correo) => {
        try {
            const res = await checkEmail(usu_correo)
            setEmailMessage(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000);
            return () => clearTimeout(timer)
        }
    }, [errors]);


    return (
        <AuthContext.Provider value={{
            validateSchema,
            checkingEmail,
            emailConfirmation,
            signup,
            signin,
            errors,
            user,
            isAuthenticated,
            emailMessage
        }}>{children}</AuthContext.Provider>
    )
}
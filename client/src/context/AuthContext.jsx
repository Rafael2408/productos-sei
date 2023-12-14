import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, emailRequest, validateShemaRegister, checkEmail, verifyTokenRequest } from '../api/auth'
import Cookies from 'js-cookie'

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
    const [loading, setLoading] = useState(true)

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
            setIsAuthenticated(true)
            setUser(res.data)
        } catch (error) {
            console.log(error)
            setErrors(error.response.data)
        }
    }

    const logout = async () => {
        Cookies.remove('token')
        setIsAuthenticated(false)
        setUser(null)
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

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()

            if (!cookies.token) {
                setIsAuthenticated(false)
                setLoading(false)
                return setUser(null)    
            }
            try {
                const res = await verifyTokenRequest(cookies.token)
                if (!res.data){
                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                }

                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)

            } catch (error) {
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)

            }

        }
        checkLogin()
    }, [])

    return (
        <AuthContext.Provider value={{
            validateSchema,
            checkingEmail,
            emailConfirmation,
            signup,
            signin,
            logout,
            loading,
            errors,
            user,
            isAuthenticated,
            emailMessage
        }}>{children}</AuthContext.Provider>
    )
}
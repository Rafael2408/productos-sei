import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, emailRequest, validateShemaRegister, checkEmail } from '../api/auth'
import { set } from "zod";

export const AuthContext = createContext();

export const useAuth = () =>{
    const context = useContext (AuthContext)
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [emailMessage, setEmailMessage] = useState(null);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error)
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

    return (
        <AuthContext.Provider value={{
            validateSchema,
            checkingEmail,
            emailConfirmation,
            signup,
            user,
            isAuthenticated,
            emailMessage
        }}>{children}</AuthContext.Provider>
    )
}
import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, emailRequest } from '../api/auth'

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

    return (
        <AuthContext.Provider value={{
            emailConfirmation,
            signup,
            user,
            isAuthenticated
        }}>{children}</AuthContext.Provider>
    )
}
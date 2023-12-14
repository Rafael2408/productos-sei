import { createContext, useContext, useState } from "react";
import { getDataAuditRequest } from '../api/audit'

const AuditContext = createContext()

export const useAudit = () => {
    const context = useContext(AuditContext)

    if (!context) {
        throw new Error('useProducts debe estar dentro del proveedor ProductProvider')
    }
    return context
}

export function AuditProvider({ children }) {
    const [dataAudit, setDataAudit] = useState([])

    const getDataAudit = async () => {
        try {
            const res = await getDataAuditRequest()
            setDataAudit(res.data)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuditContext.Provider
            value={{
                dataAudit,
                getDataAudit
            }}
        >
            {children}
        </AuditContext.Provider>
    )
}
import { createContext, useContext, useState } from "react";
import { getDataAuditRequest, createDeleteOfProductRequest } from '../api/audit'

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
        } catch (error) {
            console.log(error)
        }
    }

    const createInserOfDelete = async (usu_id) => {
        try {
            const res = await createDeleteOfProductRequest(usu_id)
        } catch (error) {
            console.log(error)
        }
    
    }

    return (
        <AuditContext.Provider
            value={{
                dataAudit,
                getDataAudit,
                createInserOfDelete
            }}
        >
            {children}
        </AuditContext.Provider>
    )
}
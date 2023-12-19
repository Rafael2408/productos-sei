import { useEffect } from 'react'
import { useAudit } from "../context/AuditContext"

function TableAuditoria() {
    const { dataAudit, getDataAudit } = useAudit()

    useEffect(() => {
        getDataAudit()
    }, [])

    return (
        <div className='p-3'>
            <h2 className='text-center'>Reporte de Todas las Acciones Registradas</h2>
            <table className="table table-bordered" style={{ tableLayout: 'auto' }}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre de Usuario</th>
                        <th>Rol</th>
                        <th>Acción</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {dataAudit.map((audit, index) => {
                        const date = new Date(audit.aud_fecha);
                        const dateString = date.toLocaleDateString();
                        const timeString = date.toLocaleTimeString();
                        return (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{audit.usu_nombre}</td>
                                <td>{audit.rol_nombre}</td>
                                <td>{audit.aud_accion}</td>
                                <td>{dateString}</td>
                                <td>{timeString}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TableAuditoria;

import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"

function TableUsers() {
  const { getUsers, users } = useAuth()

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <div className="p-3">
        <h3 className="text-center">Reporte de Usuarios en el Sistema</h3>
        <table className="table">
          <thead>
            <tr>
              <th className="col-1"></th>
              <th className="col">Nombre</th>
              <th className="col">Correo</th>
              <th className="col">Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="col-1">{index + 1}</td>
                <td className="col">{user.usu_nombre}</td>
                <td className="col">{user.usu_correo}</td>
                <td className="col">{user.rol_nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TableUsers

import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"

function TableUsers() {
  const { getUsers, users, updateUserActive, updateUserRole } = useAuth()

  useEffect(() => {
    getUsers()
  }, [])

  const handleRoleChange = async (event, user) => {
    await updateUserRole(user.usu_id, event.target.value)
    getUsers()
  }

  const handleActiveChange = async (user) => {
    await updateUserActive(user.usu_correo, !user.usu_active)
    getUsers()
  }

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
              <th className="col">Activo</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="col-1">{index + 1}</td>
                <td className="col">{user.usu_nombre}</td>
                <td className="col">{user.usu_correo}</td>
                <td className="col">
                  <select value={user.rol_id} onChange={(event) => handleRoleChange(event, user)}>
                    <option value={1}>Administrador</option>
                    <option value={2}>Operador</option>
                    <option value={3}>Auditor</option>
                    <option value={4}>Usuario</option>
                  </select>
                </td>
                <td className="col d-flex justify-content-center">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`active-switch-${user.usu_id}`}
                      checked={user.usu_active}
                      onChange={() => handleActiveChange(user)}
                    />
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TableUsers

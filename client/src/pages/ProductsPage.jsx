import '../styles/ProductsPageStyle.css'

import { useEffect } from "react"
import { useProducts } from "../context/ProductContext"
import { useAuth } from '../context/AuthContext'
import { useAudit } from '../context/AuditContext'
import { useNavigate } from 'react-router-dom'


function ProductsPage() {
  const navigate = useNavigate()

  const { getProducts, products, deleteProduct } = useProducts()
  const { user } = useAuth()
  const { createInserOfDelete } = useAudit()
  function checkUser(rol){
    switch(rol){
      case 1: navigate('/admin');
        break;
      case 2: navigate('/operador')
        break;
      case 2: navigate('/auditor')
        break;
      case 2: navigate('/products')
        break;
      default: navigate('/')
    }
  }

  useEffect(() => {
    getProducts()
    checkUser(user.rol_id)
  }, [])

  return (
    <>
      <div id='centrarDiv'>
        <h1>Lista de Productos</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio $</th>
              <th>Cantidad</th>
              <th>Categoría</th>
              <th>Nombre del Usuario</th>
              {user.rol_id < 3 && <th colSpan={2}>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.map((product) =>
              <tr key={product.pro_id}>
                <td>{product.pro_nombre}</td>
                <td>{product.pro_descripcion}</td>
                <td>{product.pro_precio}</td>
                <td>{product.pro_cantidad}</td>
                <td>{product.cat_nombre}</td>
                <td>{product.usu_nombre}</td>
                {user.rol_id < 3 && (
                  <>
                    <td>
                      <button className='btn btn-success' onClick={()=>{
                        navigate(`/products/${product.pro_id}`)
                      }}>Editar</button>
                    </td>
                    <td>
                      <button className='btn btn-danger' onClick={() => {
                        deleteProduct(product.pro_id)
                        createInserOfDelete(parseFloat(user.user_id))
                      }} >Eliminar</button>
                    </td>
                  </>
                )}
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ProductsPage
import '../styles/ProductsPageStyle.css'

import { useEffect } from "react"
import { useProducts } from "../context/ProductContext"

function ProductsPage() {

  const { getProducts, products } = useProducts()

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <h1>ProductsPage</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>ID de Categoría</th>
            <th>ID de Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) =>
            <tr key={product.pro_id}>
              <td>{product.pro_nombre}</td>
              <td>{product.pro_descripcion}</td>
              <td>{product.pro_precio}</td>
              <td>{product.pro_cantidad}</td>
              <td>{product.cat_id}</td>
              <td>{product.usu_id}</td>
              <td>
                <button>Ver</button>
                <button></button>
              </td>
            </tr>)
          }
        </tbody>
      </table>

    </>
  )
}

export default ProductsPage
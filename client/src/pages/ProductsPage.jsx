import '../styles/ProductsPageStyle.css'
import { useEffect, useState } from "react"
import { useProducts } from "../context/ProductContext"
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function ProductsPage() {
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState({})
  const [loading, setLoading] = useState(false)

  const {
    getProducts,
    products,
    deleteProduct,
    createProductPurchased
  } = useProducts()

  const { user } = useAuth()

  function checkUser(rol) {
    switch (rol) {
      case 1: navigate('/admin');
        break;
      case 2: navigate('/operador')
        break;
      case 3: navigate('/auditor')
        break;
      case 4: navigate('/user')
        break;
      default: navigate('/')
    }
  }

  const handleQuantityChange = (pro_id, event) => {
    setQuantity({ ...quantity, [pro_id]: event.target.value || 1 })
  }

  const handleBuy = async (product) => {
    setLoading(true)
    const productQuantity = quantity[product.pro_id] || 1
    if (productQuantity > product.pro_cantidad) {
      alert('No puedes comprar más productos de los disponibles')
    } else {
      await createProductPurchased({ ...product, prodcom_cantidad: productQuantity, usu_id: user.usu_id })
      await getProducts()
    }
    setLoading(false)
  }

  useEffect(() => {
    getProducts()
    if (user) {
      checkUser(user.rol_id)
    }
  }, [user])

  return (
    <>
      <div id='centrarDiv' className=" text-white">
        <h2>Lista de Productos</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {Array.isArray(products) && products.map((product) =>
            <div key={product.pro_id} className="col">
              <div className="card bg-dark text-white h-100">
                <div className="card-body">
                  <h2 className="card-title">{product.pro_nombre}</h2>
                  <p className="card-text">{product.pro_descripcion}</p>
                  <p>Precio: {product.pro_precio} $</p>
                  <p>Cantidad: {product.pro_cantidad}</p>
                  <p>Categoría: {product.cat_nombre}</p>
                  <p>Nombre del Autor: {product.usu_nombre}</p>
                  {user.rol_id === 4 && (
                    <div>
                      {product.pro_cantidad > 0 ? (
                        <div className='inputAndBtn'>
                          <input className='form-control' type="number" min="1" max={product.pro_cantidad} value={quantity[product.pro_id] || 1}
                            onChange={(event) => handleQuantityChange(product.pro_id, event)} />
                          <button id='btnComprar' className='btn' onClick={() => handleBuy(product)} disabled={loading}>
                            {loading ? 'Cargando...' : <i className="fas fa-shopping-cart"></i>}
                          </button>
                        </div>
                      ) : (
                        <p className='text-danger'>Sin stock, espere que agreguen más productos.</p>
                      )}
                    </div>
                  )}
                  {user.rol_id < 3 && (
                    <div>
                      <button className='btn btn-success' onClick={() => {
                        navigate(`/products/${product.pro_id}`)
                      }}>
                        <i className="fas fa-pencil-alt"></i> Editar
                      </button>

                      <button className='btn btn-danger' onClick={() => {
                        deleteProduct(product.pro_id)
                      }}>
                        <i className="fas fa-trash"></i> Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProductsPage

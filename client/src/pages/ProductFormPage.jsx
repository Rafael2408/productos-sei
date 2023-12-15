import '../styles/productStyle.css'

import { useAuth } from '../context/AuthContext';
import { useForm } from "react-hook-form";
import { useProducts } from '../context/ProductContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function ProductFormPage() {
  const navigate = useNavigate()
  const params = useParams()

  const { register, handleSubmit, setValue } = useForm()
  const {createProduct, updateProduct, getProductById, products } = useProducts()
 
  const { user } = useAuth();

  useEffect(() => {
    if(params.id){
      getProductById(params.id)
    }
  },[])

  useEffect(() => {
    setValue('pro_nombre', products.pro_nombre)
    setValue('pro_descripcion', products.pro_descripcion)
    setValue('pro_precio', products.pro_precio)
    setValue('pro_cantidad', products.pro_cantidad)
    setValue('cat_id', products.cat_id)
  },[products])  

  const onSubmit = handleSubmit((data) => {
    const { pro_nombre, pro_descripcion, pro_precio, pro_cantidad, cat_id } = data
    const product = {
      pro_nombre,
      pro_descripcion,
      pro_precio: parseFloat(pro_precio),
      pro_cantidad: parseFloat(pro_cantidad),
      cat_id: parseFloat(cat_id),
      usu_id: user.user_id
    }
    console.log(product)
    if(params.id){
      product.pro_id = params.id
      updateProduct(product, params.id)
    }
    else createProduct(product)
    navigate('/products')
  })


  return ( 
      <div className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}>
        <div className='col-6' id="productForm">
          <h1>Registro de Producto</h1>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre del producto</label>
              <input type="text" placeholder="Nombre del producto" className="form-control"
                {...register("pro_nombre", { required: true, maxLength: 30 })}
                autoFocus
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción del producto</label>
              <input type="text" placeholder="Litros, Cubetas, Kilos, ..." className="form-control"
                {...register("pro_descripcion", { required: true, maxLength: 30 })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Precio del producto</label>
              <input type="number" placeholder="Precio del producto" className="form-control"
              min={0}
               step={0.01}
                {...register("pro_precio", { required: true })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cantidad en stock</label>
              <input type="text" placeholder="Cantidad en stock" className="form-control"
              min={0}
                {...register("pro_cantidad", { required: true})}
              />

            </div>
            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <select {...register("cat_id", { required: true })} className="form-select">
                <option value={1}>Bebidas</option>
                <option value={9}>Carnes</option>
                <option value={2}>Cereales</option>
                <option value={3}>Enlatados</option>
                <option value={4}>Frutas y Hortalizas</option>
                <option value={5}>Grasas y Aceites</option>
                <option value={6}>Lácteos</option>
                <option value={7}>Legumbres</option>
                <option value={8}>Productos Pesqueros</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success" id='btnsubmit'>
              Guardar
            </button>
          </form>
        </div>
      </div>
  )
}

export default ProductFormPage
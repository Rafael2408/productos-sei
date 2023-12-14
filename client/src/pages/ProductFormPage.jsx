import '../styles/productStyle.css'

import { useAuth } from '../context/AuthContext';
import { useForm } from "react-hook-form";
import { useProducts } from '../context/ProductContext';

function ProductFormPage() {

  const { register, handleSubmit } = useForm()
  const {createProduct} = useProducts()
 
  const { user } = useAuth();

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
    createProduct(product)
  })


  return (
    
    <div>
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
              <input type="text" placeholder="Descripción del producto" className="form-control"
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
                <option value={2}>Carnes</option>
                <option value={3}>Cereales</option>
                <option value={4}>Enlatados</option>
                <option value={5}>Frutas y Hortalizas</option>
                <option value={6}>Grasas y Aceites</option>
                <option value={7}>Lácteos</option>
                <option value={8}>Legumbres</option>
                <option value={9}>Productos Pesqueros</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProductFormPage
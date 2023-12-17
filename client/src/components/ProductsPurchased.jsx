import { useEffect } from "react"
import { useProducts } from "../context/ProductContext"
import { useAuth } from "../context/AuthContext"

function ProductsPurchased() {
    const { productsPurchased, getProductsPurchasedById } = useProducts()
    const { user } = useAuth()

    useEffect(() => {
        getProductsPurchasedById(user.user_id)
    }, [user])


    return (
        <>
            <div className="p-3">
                <h3 className="text-center">Productos Comprados Por Tí</h3>
                <table style={{ tableLayout: "auto", width: "100%" }}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nombre del Producto</th>
                            <th>Cantidad</th>
                            <th>Fecha</th>
                            <th>Compras</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsPurchased.map((product, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{product.pro_nombre}</td>
                                <td>{product.prodcom_cantidad}</td>
                                <td>{new Date(product.prodcom_fecha).toLocaleDateString()}</td>
                                <td>{new Date(product.prodcom_fecha).toLocaleTimeString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ProductsPurchased

import { useEffect } from "react";
import { useProducts } from "../context/ProductContext";

function TableProductsPurchased() {
    const { productsPurchased, getProductsPurchased } = useProducts()

    useEffect(() => {
        getProductsPurchased()
    }, [])

    return (
        <>
            {productsPurchased.length > 0 ? (<>
                <div className="p-3">
                    <h3 className="text-center">Reporte de Compras de Productos por Usuarios</h3>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nombre del Comprador</th>
                                <th>Nombre del Producto</th>
                                <th>Cantidad</th>
                                <th>Descripción</th>
                                <th>Fecha de Compra</th>
                                <th>Hora de Compra</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsPurchased.map((product, index) => {
                                const date = new Date(product.prodcom_fecha);
                                const dateString = date.toLocaleDateString();
                                const timeString = date.toLocaleTimeString();
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{product.usu_nombre}</td>
                                        <td>{product.pro_nombre}</td>
                                        <td>{product.prodcom_cantidad}</td>
                                        <td>{product.pro_descripcion}</td>
                                        <td>{dateString}</td>
                                        <td>{timeString}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </>):(<>
                <div className="p-3">
                    <h4 className="text-center text-red-500">No hay compras registradas</h4>
                </div>
            </>)}
        </>
    )
}

export default TableProductsPurchased

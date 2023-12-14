import { createContext, useContext, useState } from "react";
import { getProductsRequest, createProductRequest, deleteProductRequest } from '../api/product'

const ProductContext = createContext()

export const useProducts = () => {
    const context = useContext(ProductContext)

    if (!context) {
        throw new Error('useProducts debe estar dentro del proveedor ProductProvider')
    }
    return context
}

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        try {
            const res = await getProductsRequest()
            setProducts(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createProduct = async (product) => {
        const res = await createProductRequest(product)
        console.log(res)
    }

    const deleteProduct = async (id) => {
        try {
            const res = await deleteProductRequest(id)
            if(res.status <= 200 && res.status < 300) {
                //crea un arreglo nuevo sin el producto con ese id
                setProducts(products.filter(product => product.pro_id !== id))
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ProductContext.Provider
            value={{
                products,
                createProduct,
                getProducts,
                deleteProduct
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}
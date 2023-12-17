import { createContext, useContext, useState } from "react";
import { getProductsRequest, getProductRequest, createProductRequest, deleteProductRequest, updateProductRequest, getProductsPurchasedRequest, getProductPurchasedByIdRequest, createProductPurchasedRequest, updateStockRequest } from '../api/product'

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
    const [productsPurchased, setProductsPurchased] = useState([])

    const getProducts = async () => {
        try {
            const res = await getProductsRequest()
            setProducts(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getProductById = async (id) => {
        try {
            const res = await getProductRequest(id)
            setProducts(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const createProduct = async (product) => {
        try {
            const res = await createProductRequest(product)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
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
    const updateProduct = async (product) => {
        try {
            const res = await updateProductRequest(product)
        } catch (error) {
            console.log(error)
        }
    }

    const getProductsPurchased = async () => {
        try {
            const res = await getProductsPurchasedRequest()
            setProductsPurchased(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getProductsPurchasedById = async (id) =>{
        try {
            const res = await getProductPurchasedByIdRequest(id)
            setProductsPurchased(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createProductPurchased = async (productPurchased) =>{
        try {
            productPurchased.prodcom_cantidad = Number(productPurchased.prodcom_cantidad);
            await createProductPurchasedRequest(productPurchased)
            const resp = await updateStockRequest(productPurchased)
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
                getProductById,
                deleteProduct,
                updateProduct,
                
                getProductsPurchased,
                getProductsPurchasedById,
                createProductPurchased, 
                productsPurchased 
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}
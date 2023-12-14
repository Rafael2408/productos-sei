import { createContext, useContext, useState } from "react";
import {getProductsRequest, createProductRequest} from '../api/product'

const ProductContext = createContext()

export const useProducts = () => {
    const context = useContext(ProductContext)

    if(!context){
        throw new Error('useProducts debe estar dentro del proveedor ProductProvider')
    }
    return context
}

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([])

    const getProducts = async () =>{
        try {
            const res = await getProductsRequest()
            setProducts(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createProduct = async(product) => {
        const res =await createProductRequest(product)
        console.log(res)
    }

  return (
    <ProductContext.Provider 
        value={{
            products,
            createProduct,
            getProducts
        }}
    >
      {children}
    </ProductContext.Provider>
  )
}
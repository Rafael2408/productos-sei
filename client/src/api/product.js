import axios from './axios'

export const getProductsRequest = () => axios.get('/products')
export const getProductRequest = (id) => axios.get(`/products/${id}`)
export const createProductRequest = (product) => axios.post('/products', product)
export const updateProductRequest = (product) => axios.put(`/products/${product.pro_id}`, product)
export const deleteProductRequest = (id) => axios.delete(`/products/${id}`)

export const getProductsPurchasedRequest = () => axios.get('/products-purchased')
export const getProductPurchasedByIdRequest = (id) => axios.get(`products-purchased/${id}`)
export const createProductPurchasedRequest = (productPurchased) => axios.post(
    '/products-purchased', 
    productPurchased
)
export const updateStockRequest = (productPurchased) => axios.put(
    `/products-stock/${productPurchased.pro_id}`, 
    productPurchased
)

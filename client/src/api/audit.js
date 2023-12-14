import axios from './axios'

export const getDataAuditRequest = () => axios.get('/get-audit')

export const createDeleteOfProductRequest = (id) => axios.post(`/create-delete-of-product/${id}`)
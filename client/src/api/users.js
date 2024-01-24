import axios from './axios'

export const getUsersRequest = () => axios.get('/users')

export const getUserByIdRequest = (id) => axios.get(`/users/${id}`)

export const updateUserRoleRequest = (rol_id, usu_id) => axios.put(`/users`, { rol_id, usu_id })

export const updateUserActiveRequest = (usu_correo, usu_active) => axios.put(`/users/active`, { usu_correo, usu_active })

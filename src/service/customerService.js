import http from "../config/http";

const create = (data) => http.post('/customer/create', data)

const findAll = () => http.get('/customer')

const find = (npsv) => http.get(`/customer/${npsv}`)

const inactivate = (npsv) => http.put(`/customer/inactivate/${npsv}`)

const deleteCustomer = (npsv) => http.delete(`/customer/${npsv}`)

export default {
    create,
    findAll,
    find,
    inactivate,
    deleteCustomer
}
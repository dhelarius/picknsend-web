import http from "../config/http";

const create = (data) => http.post('/customer/create', data)

const findAll = () => http.get('/customer')

const find = (npsv) => http.get(`/customer/${npsv}`)

const update = (data) => http.put(`/customer`, data)

const inactivate = (npsv) => http.put(`/customer/inactivate/${npsv}`, null)

const deleteCustomer = (npsv) => http.delete(`/customer/${npsv}`)

export default {
    findAll,
    find,
    create,
    update,
    inactivate,
    deleteCustomer
}
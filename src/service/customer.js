import http from "../config/http";

const createCustomer = (data) => http.post('/customer/create', data)

const getCustomers = () => http.get('/customer')

const getCustomer = (npsv) => http.get(`/customer/${npsv}`)

const deleteCustomer = (npsv) => http.delete(`/customer/${npsv}`)

export default {
    createCustomer,
    getCustomers,
    getCustomer,
    deleteCustomer
}
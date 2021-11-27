import http from "../config/http";

const getCustomers = () => http.get('/customer')

const getCustomer = (npsv) => http.get(`/customer/${npsv}`)

const deleteCustomer = (npsv) => http.delete(`/customer/${npsv}`)

export default {
    getCustomers: getCustomers,
    getCustomer: getCustomer,
    deleteCustomer: deleteCustomer
}
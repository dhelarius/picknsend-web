import { customerInstance } from "../config/axios";
import http from "../config/http";

const customer = http(customerInstance);

const create = (data) => customer.post('/customer/create', data)

const findAll = () => customer.get('/customer')

const find = (npsv) => customer.get(`/customer/${npsv}`)

const update = (data) => customer.put(`/customer`, data)

const inactivate = (npsv) => customer.put(`/customer/inactivate/${npsv}`, null)

const deleteCustomer = (npsv) => customer.delete(`/customer/${npsv}`)

export default {
    findAll,
    find,
    create,
    update,
    inactivate,
    deleteCustomer
}
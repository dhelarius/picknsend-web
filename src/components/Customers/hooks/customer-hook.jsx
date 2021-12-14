import React, { useState, useEffect } from "react";
import customerService from "../../../service/customerService";

const useCreateCustomer = (cbSuccess, cbError) => {
    const [newCustomer, setNewCustomer] = useState(null);

    useEffect(() => {
        if (newCustomer) {
            customerService.create(newCustomer).then(response => {
                console.log(response.data);
                cbSuccess();
            }).catch(err => {
                let message = typeof err.response !== undefined ? err.response.data.message : err.message;
                console.warn('error:', message);
                cbError(message);
            });
        }
    }, [newCustomer]);

    return { setNewCustomer };
}

const useFindAllCustomers = (deleted, update) => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        customerService.findAll().then(response => {
            setCustomers(response.data);
        });
    }, [deleted, update])

    if(!customers) return null;

    return customers;
}

const useFindCustomer = (npsv) => {
    const [dataCustomer, setCustomer] = useState({});

    useEffect(() => {
        customerService.find(npsv).then(response => {
            setCustomer(response.data);
        });
    }, [])

    if(!dataCustomer) return null;

    return dataCustomer;
}

const deleteCustomer = (npsv, cb) => customerService.deleteCustomer(npsv).then(response => {
    let deleted = response.data;
    if (deleted) {
        cb();
    }
}).catch(err => cb());

const inactivateCustomer = (npsv, cbSuccess, cbError) => customerService.inactivate(npsv).then(response => {
    let data = response.data;
    if (data) {
        cbSuccess();
    }
}).catch(err => {
    console.error('error:', err.message);
    cbError(err.message);
});

export { 
    useCreateCustomer, 
    useFindAllCustomers, 
    useFindCustomer, 
    deleteCustomer,
    inactivateCustomer
}
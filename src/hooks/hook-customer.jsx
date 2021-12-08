import React, { useState, useEffect } from "react";
import customer from "../service/customer";

const useCreateCustomer = (cbSuccess, cbError) => {
    const [newCustomer, setNewCustomer] = useState(null);

    useEffect(() => {
        if (newCustomer) {
            customer.createCustomer(newCustomer).then(response => {
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

const useCustomers = (deleted, update) => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        customer.getCustomers().then(response => {
            setCustomers(response.data);
        });
    }, [deleted, update])

    if(!customers) return null;

    return customers;
}

const useCustomer = (npsv) => {
    const [dataCustomer, setCustomer] = useState({});

    useEffect(() => {
        customer.getCustomer(npsv).then(response => {
            setCustomer(response.data);
        });
    }, [])

    if(!dataCustomer) return null;

    return dataCustomer;
}

const deleteCustomer = (npsv, cb) => customer.deleteCustomer(npsv).then(response => {
    let deleted = response.data;
    if (deleted) {
        cb();
    }
}).catch(err => cb());

const inactivateCustomer = (npsv, cbSuccess, cbError) => customer.inactivateCustomer(npsv).then(response => {
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
    useCustomers, 
    useCustomer, 
    deleteCustomer,
    inactivateCustomer
}
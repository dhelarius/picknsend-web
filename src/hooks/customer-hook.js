import { useState, useEffect } from "react";
import customerService from "../service/customerService";

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

const useCreateCustomer = (success, error) => {
    const [newCustomer, setNewCustomer] = useState(null);

    useEffect(() => {
        if (newCustomer) {
            customerService.create(newCustomer).then(response => {
                console.log(response.data);
                success('El elemento ha sido creado satisfactoriamente!');
            }).catch(err => {
                let message = typeof err.response !== undefined ? err.response.data.message : err.message;
                console.warn('error:', message);
                error(message);
            });
        }
    }, [newCustomer]);

    return { setNewCustomer };
}

const useUpdateCustomer = (success, error) => {
    const [customer, setUpdatedData] = useState(null);

    useEffect(() => {
        if (customer) {
            customerService.update(customer).then(response => {
                console.log(response.data);
                success('El elemento ha sido actualizado satisfactoriamente!');
            }).catch(err => {
                let message = typeof err.response !== undefined ? err.response.data.message : err.message;
                console.warn('error:', message);
                error(message);
            });
        }
    }, [customer])

    return { setUpdatedData }
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
    useFindAllCustomers, 
    useFindCustomer, 
    useCreateCustomer, 
    useUpdateCustomer,
    deleteCustomer,
    inactivateCustomer
}
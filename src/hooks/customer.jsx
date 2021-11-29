import React, { useState, useEffect } from "react";
import customer from "../service/customer";

const useCustomers = (deleted) => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        customer.getCustomers().then(response => {
            setCustomers(response.data);
        });
    }, [deleted])

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

/*const useDeleteCustomer = (npsv) => {
    const [isDelete, setIsDelete] = useState(false);

    useEffect(() => {
        customer.deleteCustomer(npsv);
        setIsDelete(true);
    }, [])

    return isDelete;
}*/

const deleteCustomer = (npsv) => customer.deleteCustomer(npsv);

export { useCustomers, useCustomer, deleteCustomer }
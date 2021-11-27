import { useEffect, useState } from "react";
import customer from "../service/customer";

const useCustomers = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        customer.getCustomers().then(response => {
            setCustomers(response.data);
        });
    }, [])

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
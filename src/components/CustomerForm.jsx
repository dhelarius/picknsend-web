import { XIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { PicknsendButton } from "./Button";

const CustomerForm = ({ customer, hideCustomerModal, showLoader }) => {
    const [value, setValue] = useState('');

    const { 
        npsv,
        name,
        lastName,
        address,
        phone,
        dni,
        email,
        status
    } = customer;

    const inputChangeHandler = (e) => {
        setValue(e.target.value);
    }

    return (
        <form action="" className="flex flex-col max-w-screen-sm mx-auto bg-white p-6 shadow rounded-md">
            <div 
                className="flex justify-center items-center self-end h-8 w-8 hover:bg-gray-100 text-gray-700 m-2 mb-4 rounded-md"
                onClick={() => hideCustomerModal()}
            >
                <XIcon className="h-5 w-5" />
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-x-4">
                <input className="flex-grow sm:w-16 bg-gray-100 border-0 rounded-md" type="text" defaultValue={npsv} onBlur={inputChangeHandler} placeholder="npsv" readOnly={true} />
                <input className="mt-4 sm:mt-0 flex-grow bg-gray-100 border-0 rounded-md" type="text" placeholder="Nombre" />
                <input className="mt-4 sm:mt-0 flex-grow bg-gray-100 border-0 rounded-md" type="text" placeholder="Apellido" />
            </div>
            <input className="mt-4 bg-gray-100 border-0 rounded-md" type="text" placeholder="Dirección" />
            <div className="flex flex-col sm:flex-row sm:gap-x-4">
                <input className="mt-4 flex-grow bg-gray-100 border-0 rounded-md" type="tel" placeholder="Teléfono" />
                <input className="mt-4 flex-grow bg-gray-100 border-0 rounded-md" type="text" placeholder="Cédula" />
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-x-4">
                <input className="mt-4 flex-grow bg-gray-100 border-0 rounded-md" type="email" placeholder="email@ejemplo.com" />
                <select className="mt-4 bg-gray-100 border-0 rounded-md text-gray-500">
                    {["Activo", "Inactivo"].map(status => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>
            <div className="text-center mt-6">
                <PicknsendButton
                    onClick={() => showLoader()}
                >
                    GUARDAR
                </PicknsendButton>
            </div>
        </form>
    );
}

const CustomerFormModal = ({ customer, hideCustomerModal, showLoader }) => {
    return (
        <div className="bg-modal">
            <div className="relative top-7 sm:top-1/4">
                <CustomerForm customer={customer} hideCustomerModal={hideCustomerModal} showLoader={showLoader} />
            </div>
        </div>
    );
}

export { CustomerFormModal }

export default CustomerForm
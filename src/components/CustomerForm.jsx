import { XIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PicknsendButton } from "./Button";

const CustomerForm = ({ customer, hideCustomerModal, showLoader }) => {
    /*const [value, setValue] = useState('');

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
                <input className="flex-grow input-picknsend sm:w-16 bg-gray-100" type="text" defaultValue={npsv} onBlur={inputChangeHandler} placeholder="npsv" readOnly={true} />
                <input className="flex-grow input-picknsend mt-4 sm:mt-0 bg-gray-100" type="text" placeholder="Nombre" />
                <input className="flex-grow input-picknsend mt-4 sm:mt-0 bg-gray-100" type="text" placeholder="Apellido" />
            </div>
            <input className="input-picknsend mt-4 bg-gray-100" type="text" placeholder="Dirección" />
            <div className="flex flex-col sm:flex-row sm:gap-x-4">
                <input className="flex-grow input-picknsend mt-4 bg-gray-100" type="tel" placeholder="Teléfono" />
                <input className="flex-grow input-picknsend mt-4 bg-gray-100" type="text" placeholder="Cédula" />
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-x-4">
                <input className="flex-grow input-picknsend mt-4 bg-gray-100" type="email" placeholder="email@ejemplo.com" />
                <select className="mt-4 bg-gray-100 input-picknsend text-gray-500">
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
    );*/

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => { 
        console.log(data);
        showLoader(); 
    }

    return (
        <form className="flex flex-col max-w-screen-sm mx-auto bg-white p-6 shadow rounded-md" onSubmit={handleSubmit(onSubmit)}>
            <div 
                className="flex justify-center items-center self-end h-8 w-8 hover:bg-gray-100 text-gray-700 m-2 mb-4 rounded-md"
                onClick={() => hideCustomerModal()}
            >
                <XIcon className="h-5 w-5" />
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-x-4 mb-1">
                <div className="flex flex-col flex-grow sm:w-16">
                    <input className="input-picknsend h-10 bg-gray-100" type="text" {...register("npsv", { required: true })} placeholder="npsv" />
                    <div className="h-6">
                        {errors.npsv && <span className="text-error text-xs">* requerido</span>}
                    </div>
                </div>
                <div className="flex flex-col flex-grow">
                    <input className="input-picknsend h-10 bg-gray-100" type="text" {...register("name", { required: true })} placeholder="Nombre" />
                    <div className="h-6">
                        {errors.name && <span className="text-error text-xs">* requerido</span>}
                    </div>
                </div>
                <div className="flex flex-col flex-grow">
                    <input className="input-picknsend h-10 bg-gray-100" type="text" {...register("lastname", { required: true })} placeholder="Apellido" />
                    <div className="h-6">
                        {errors.lastname && <span className="text-error text-xs">* requerido</span>}
                    </div>
                </div>
            </div>
            <div className="flex flex-col h-16 mb-1">
                <input className="input-picknsend bg-gray-100" type="text" {...register("address", { required: true })} placeholder="Dirección" />
                {errors.address && <span className="text-error text-xs">* requerido</span>}
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-x-4">
                <div className="flex flex-col flex-grow">
                    <input className="input-picknsend h-10 bg-gray-100" type="tel" {...register("phone", { required: true })} placeholder="Teléfono" />
                    <div className="h-6">
                        {errors.phone && <span className="text-error text-xs">* requerido</span>}
                    </div>
                </div>
                <div className="flex flex-col flex-grow mb-1">
                    <input className="input-picknsend h-10 bg-gray-100" type="text" {...register("dni", { required: true })} placeholder="Cédula" />
                    <div className="h-6">
                        {errors.dni && <span className="text-error text-xs">* requerido</span>}
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-x-4">
                <input className="flex-grow input-picknsend mb-7 sm:mb-0 bg-gray-100" type="email" {...register("email")} placeholder="email@ejemplo.com" />
                <select className=" bg-gray-100 input-picknsend text-gray-500" {...register("status")}>
                    {["Activo", "Inactivo"].map(status => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>
            {/*<input className="btn-picknsend h-10 mt-6 uppercase text-sm font-medium" type="submit" defaultValue="guardar" />*/}
            <div className="text-center uppercase mt-6">
                <PicknsendButton
                 onClick={handleSubmit(onSubmit)}
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
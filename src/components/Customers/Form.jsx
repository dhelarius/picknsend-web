import { XIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";
import { useCreateCustomer, useUpdateCustomer } from "./hooks/customer-hook";
import date from "../../utils/date";
import { PicknsendButton } from "../Button";
import { useEffect } from "react/cjs/react.development";

const Field = (props) => {
    const { type, id, label, placeholder, register, error, readOnly } = props;

    return (
        <>
            <div className="flex flex-col mt-1">
                <label className="mb-1 text-md font-medium text-gray-700" htmlFor={id}>{label}</label>
                <input 
                    className="input-picknsend bg-gray-100" 
                    type={type} 
                    id={id} 
                    {...register} 
                    placeholder={placeholder}
                    readOnly={readOnly}
                />
            </div>
            {<div className="h-6">
                {error && <span className="text-error text-xs">* requerido</span>}
            </div>}
        </>
    );
}

const Form = ({ 
    onClose, 
    onLoader, 
    onUpdate, 
    handlePopover,
    customer,
    setCustomer
}) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const isAddMode = !customer;

    const add = (data) => {
        data.creationDate = date.now();
        setNewCustomer(data);
    }

    const onSubmit = data => {
        onLoader(true);
        isAddMode ? add(data) : setUpdatedData(data);
    }

    const { 
        handleOpenPopover, 
        setMessage,
        setSeverity,
        setAlign,
        setDuration
    } = handlePopover;

    const handleSuccess = (message) => {
        onLoader(false);
        onClose();
        handlePopoverSuccess(message);
        onUpdate();
    }

    const handleError = (message) => {
        onLoader(false);
        onClose();
        handlePopoverError(message);
    }

    const handlePopoverSuccess = (message) => {
        setMessage(message)
        setSeverity('success');
        setAlign('right');
        setDuration(6000);
        handleOpenPopover();
    }

    const handlePopoverError = (message) => {
        setMessage(message)
        setSeverity('warning');
        setAlign('right');
        setDuration(8000);
        handleOpenPopover();
    }

    const { setNewCustomer } = useCreateCustomer(handleSuccess, handleError);
    const { setUpdatedData } = useUpdateCustomer(handleSuccess, handleError);

    useEffect(() => {
        if (!isAddMode) {
            const fields = ['npsv', 'name', 'lastName', 'address', 'phone', 'dni', 'email', 'creationDate', 'status'];
            fields.forEach(field => setValue(field, customer[field]));
        }
        return () => setCustomer(null);
    }, []);

    return (
        <>
            <form className="flex flex-col surface max-w-full w-full" onSubmit={handleSubmit(onSubmit)}>
                <div 
                    className="flex justify-center items-center self-end h-8 w-8 hover:bg-gray-100 text-gray-700 m-2 mb-4 rounded-md"
                    onClick={onClose}
                >
                    <XIcon className="h-5 w-5" />
                </div>
                <div className="sm:flex sm:gap-x-4">
                    <div className="flex-grow sm:w-24">
                        <Field type="text" id="fnpsv" label="Npsv"register={{...register("npsv", { required: true })}} error={errors.npsv} placeholder="e.g 1001" readOnly={isAddMode ? false : true} />
                    </div>
                    <div className="sm:flex-grow">
                        <Field type="text" id="fname" label="Nombre" register={{...register("name", { required: true })}} error={errors.name} placeholder="e.g José" />
                    </div>
                    <div className="sm:flex-grow">
                        <Field type="text" id="flastname" label="Apellido" register={{...register("lastName", { required: true })}} error={errors.lastName} placeholder="e.g Gutierrez" />
                    </div>
                </div>
                <div>
                    <Field type="text" id="faddress" label="Dirección" register={{...register("address")}} placeholder="e.g La Vega R.D." />
                </div>
                <div className="sm:flex sm:gap-x-4">
                    <div className="sm:flex-grow">
                        <Field type="tel" id="fphone" label="Teléfono" register={{...register("phone", { required: true })}} error={errors.phone} placeholder="e.g (809)-409-0000" />
                    </div>
                    <div className="sm:flex-grow">   
                        <Field type="text" id="fdni" label="Cédula" register={{...register("dni", { required: true })}} error={errors.dni} placeholder="e.g 402-0000001-01" />
                    </div>
                </div>
                <div className="sm:flex sm:gap-x-4">
                    <div className="sm:flex-grow">   
                        <Field type="email" id="femail" label="Email" register={{...register("email")}} placeholder="mail@ejemplo.com" />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 text-md font-medium text-gray-700" htmlFor="status">Estado</label>
                        <select className="input-picknsend bg-gray-100 text-gray-500 sm:mt-1" id="status" {...register("status")}>
                            {[{id: 1, description: 'Activo', value: 'A'}, 
                              {id: 2, description: 'Inactivo', value: 'I'}].map(status => (
                                <option key={status.id} value={status.value}>
                                    {status.description}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="text-center uppercase mt-6 sm:mt-0">
                    <PicknsendButton
                    onClick={handleSubmit(onSubmit)}
                    >
                        {isAddMode ? 'GUARDAR' : 'EDITAR'}
                    </PicknsendButton>
                </div>
            </form>
        </>
    );
}

export default Form
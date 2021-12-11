import { XIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";
import { useCreateCustomer } from "../../hooks/hook-customer";
import date from "../../utils/date";
import { PicknsendButton } from "../Button";

const Field = (props) => {
    const { type, id, label, placeholder, register, error } = props;

    return (
        <>
            <div className="flex flex-col mt-1">
                <label className="mb-1 text-md font-medium text-gray-700" htmlFor={id}>{label}</label>
                <input className="input-picknsend bg-gray-100" type={type} id={id} {...register} placeholder={placeholder} />
            </div>
            {<div className="h-6">
                {error && <span className="text-error text-xs">* requerido</span>}
            </div>}
        </>
    );
}

const CustomerForm = ({ 
    onClose, 
    onLoader, 
    onUpdate, 
    handlePopover
}) => {
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
    }*/

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { 
        handleOpenPopover, 
        setMessage,
        setSeverity,
        setAlign,
        setDuration
    } = handlePopover;

    const handleSuccess = () => {
        onLoader(false);
        onClose();
        handlePopoverSuccess();
        onUpdate();
    }

    const handleError = (message) => {
        onLoader(false);
        onClose();
        handlePopoverError(message);
    }

    const handlePopoverSuccess = () => {
        setMessage('El elemento se ha creado satisfactoriamente!')
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

    const onSubmit = data => {
        onLoader(true);
        data.creationDate = date.now();
        setNewCustomer(data);
    }

    return (
        <>
            {/*<form className="flex flex-col max-w-screen-sm mx-auto surface" onSubmit={handleSubmit(onSubmit)}>
                <div 
                    className="flex justify-center items-center self-end h-8 w-8 hover:bg-gray-100 text-gray-700 m-2 mb-4 rounded-md"
                    onClick={onClose}
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
                <div className="text-center uppercase mt-6">
                    <PicknsendButton
                    onClick={handleSubmit(onSubmit)}
                    >
                        GUARDAR
                    </PicknsendButton>
                </div>
            </form>*/}
            {/*<input className="btn-picknsend h-10 mt-6 uppercase text-sm font-medium" type="submit" defaultValue="guardar" />*/}
            <form className="flex flex-col surface max-w-full w-full" onSubmit={handleSubmit(onSubmit)}>
                <div 
                    className="flex justify-center items-center self-end h-8 w-8 hover:bg-gray-100 text-gray-700 m-2 mb-4 rounded-md"
                    onClick={onClose}
                >
                    <XIcon className="h-5 w-5" />
                </div>
                <div className="sm:flex sm:gap-x-4">
                    <div className="flex-grow sm:w-24">
                        <Field type="text" id="fnpsv" label="Npsv"register={{...register("npsv", { required: true })}} error={errors.npsv} placeholder="e.g 1001" />
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
                        GUARDAR
                    </PicknsendButton>
                </div>
            </form>
        </>
    );
}

const CustomerFormDialog = ({ 
    open, 
    onClose, 
    onUpdate, 
    onLoader, 
    handlePopover
}) => {
    return (
        <>
            {open && <div className="bg-modal">
                <div className="sm:max-w-screen-md w-full">
                    <CustomerForm 
                        onClose={onClose} 
                        onLoader={onLoader} 
                        onUpdate={onUpdate} 
                        handlePopover={handlePopover}
                    />
                </div>
            </div>}
        </>
    );
}

export { CustomerFormDialog }

export default CustomerForm
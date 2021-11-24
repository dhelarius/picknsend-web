import { XIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";
import { PicknsendButton } from "./Button";

const ReactHookForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input defaultValue="test" {...register("example")} />
          
          {/* include validation with required or other standard HTML validation rules */}
          <input {...register("exampleRequired", { required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}
          
          <input type="submit" />
        </form>
    );
}

const SampleForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => console.log(data);

    return (
        <form className="flex flex-col max-w-screen-sm mx-auto bg-white p-6 shadow rounded-md" onSubmit={handleSubmit(onSubmit)}>
            <div 
                className="flex justify-center items-center self-end h-8 w-8 hover:bg-gray-100 text-gray-700 m-2 mb-4 rounded-md"
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

export { SampleForm }

export default ReactHookForm
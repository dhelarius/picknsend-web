import { XIcon } from "@heroicons/react/solid";
import { PicknsendButton } from "./Button";

const CustomerForm = () => {
    return (
        <div className="flex flex-col max-w-screen-sm mx-auto bg-white p-6 shadow rounded-md">
            <div className="flex justify-center items-center self-end h-8 w-8 hover:bg-gray-100 text-gray-700 m-2 mb-4 rounded-md">
                <XIcon className="h-5 w-5" />
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-x-4">
                <input className="flex-grow sm:w-16 bg-gray-100 border-0 rounded-md" type="text" placeholder="npsv" />
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
                    onClick={() => console.log(`Guardar nuevo cliente`)}
                >
                    GUARDAR
                </PicknsendButton>
            </div>
        </div>
    );
}

export default CustomerForm
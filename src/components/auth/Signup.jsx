import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { useShowPassword } from "./hooks/auth-hooks";

const Signup = () => {
    const {
        showPassword,
        handleShowPassword
    } = useShowPassword();

    return(
        <form className="max-w-lg w-full py-16 px-12">
            <p className="title text-center mb-6">REGISTRAR USUARIO</p>
            <div className="flex flex-col mb-4">
                <label className="label mb-1">Usuario</label>
                <input className="input-picknsend" type='text' placeholder="Nombre de usuario" />
            </div>
            <div className="flex flex-col mb-8">
                <label className="label mb-1">Contraseña</label>
                <div className="relative">
                    <input className="input-picknsend w-full" type={showPassword ? 'text' : 'password'} placeholder="Escribe una contraseña" />
                    <div
                        className="absolute h-5 w-5 top-2.5 right-0 mr-3 text-gray-400 cursor-pointer"
                        onClick={() => handleShowPassword()}
                    >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </div>
                </div>
            </div>
            <button className="btn btn-picknsend w-full mb-8 py-3">REGISTRARSE</button>
            <div className="text-center">
                <p className="subtitle-dark mb-2">¿Ya tienes una cuenta?
                    <Link to='/login'>
                        <span className="text-picknsend"> Iniciar Sesion</span>
                    </Link> 
                </p>
            </div>
        </form>
    );
}

export default Signup
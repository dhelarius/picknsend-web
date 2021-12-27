import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import { useShowPassword } from "./hooks/auth-hooks";
import { useForm } from "react-hook-form"
import { authService } from "../../service";

const Signup = ({ 
    handleOpenLoader,
    handleCloseLoader,
    handleOpenPopover,
    setMessage,
    setSeverity,
    setAlign,
    setDuration
}) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const {
        showPassword,
        handleShowPassword
    } = useShowPassword();

    const onSubmit = data => {
        handleOpenLoader();
        authService.signup(data).then(response => {
            const { message } = response.data;
            handleSuccess(message);
        }).catch(err => {
            let message = typeof err.response !== undefined ? err.response.data.errors[0].msg : err.message;
            console.warn(message);
            handleError(message);
        });
    }

    const handleSuccess = (message) => {
        handleCloseLoader();
        setMessage(message);
        setSeverity('success');
        setAlign('right');
        setDuration(6000);
        handleOpenPopover();
        navigate('/login');
    }

    const handleError = (message) => {
        handleCloseLoader();
        setMessage(message);
        setSeverity('warning');
        setAlign('right');
        setDuration(8000);
        handleOpenPopover();
    }

    return(
        <form className="max-w-lg w-full py-16 px-12" onSubmit={handleSubmit(onSubmit)}>
            <p className="title text-center mb-6">REGISTRAR USUARIO</p>
            <div className="flex flex-col mb-2">
                <label className="label mb-1">Usuario</label>
                <input className="input-picknsend" type='text' 
                    {...register('username', { required: true, minLength: 4 })}
                    placeholder="Nombre de usuario" />
                    <div className="h-4">
                        {errors.username?.type === 'required' && <span className="text-error text-xs">Usuario requerido</span>}
                        {errors.username?.type === 'minLength' && <span className="text-error text-xs">Mínimo 4 caracteres para el usuario</span>}
                    </div>
            </div>
            <div className="flex flex-col mb-4">
                <label className="label mb-1">Contraseña</label>
                <div className="relative">
                    <input className="input-picknsend w-full" type={showPassword ? 'text' : 'password'}  
                        {...register('password', { required: true, minLength: 8 })}
                        placeholder="Escribe una contraseña" />
                    <div
                        className="absolute h-5 w-5 top-2.5 right-0 mr-3 text-gray-400 cursor-pointer"
                        onClick={() => handleShowPassword()}
                    >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </div>
                </div>
                <div className="h-4">
                    {errors.password?.type === 'required' && <span className="text-error text-xs">Contraseña requerida</span>}
                    {errors.password?.type === 'minLength' && <span className="text-error text-xs">Mínimo 8 caracteres para la contraseña</span>}
                </div>
            </div>
            <input type="submit" className="btn btn-picknsend w-full mb-8 py-3" value="REGISTRARSE" />
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
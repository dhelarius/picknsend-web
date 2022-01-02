import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context";
import { useShowPassword } from './hooks/auth-hooks';

const Login = ({
    handleOpenLoader,
    handleCloseLoader,
    handleOpenPopover,
    setMessage,
    setSeverity,
    setAlign,
    setDuration
}) => {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const from = location.state?.from?.pathname || "/main";

    const {
        showPassword,
        handleShowPassword
    } = useShowPassword();

    const onSubmit = data => {
        handleOpenLoader();
        auth.login(data, handleSuccess, handleError, 
        () => {
            navigate(from, { replace: true });
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
            <p className="title text-center mb-6">INICIAR SESION</p>
            <div className="flex flex-col mb-1">
                <label className="label mb-1">Usuario</label>
                <input className="input-picknsend" {...register('username', { required: true })} type='text' placeholder="Nombre de usuario" />
                <div className="h-4">
                    {errors.username?.type === 'required' && <span className="text-error text-xs">Usuario requerido</span>}
                </div>
            </div>
            <div className="flex flex-col mb-4">
                <label className="label mb-1">Contraseña</label>
                <div className="relative">
                    <input className="input-picknsend w-full" {...register('password', { required: true })} type={showPassword ? 'text' : 'password'} placeholder="Escribe tu contraseña" />
                    <div 
                        className="absolute h-5 w-5 top-2.5 right-0 mr-3 text-gray-400 cursor-pointer"
                        onClick={() => handleShowPassword()}
                    >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </div>
                </div>
                <div className="h-4">
                    {errors.password?.type === 'required' && <span className="text-error text-xs">Contraseña requerida</span>}
                </div>
            </div>
            <button type="submit" className="btn btn-picknsend w-full mb-8 py-3">INICIAR SESION</button>
            <div className="text-center">
                <p className="subtitle-dark mb-2">Crea tu cuenta 
                    <Link to='/signup'>
                        <span className="text-picknsend"> Registrarse</span>
                    </Link> 
                </p>
                <a href="" className="subtitle-dark">Cambiar contraseña</a>
            </div>
        </form>
    );
}

export default Login
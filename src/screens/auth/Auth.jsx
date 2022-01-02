import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import Login from "../../components/auth/Login";
import Signup from "../../components/auth/signup";
import Logo from "../../components/common/Logo/Logo";
import { useAuth } from "../../context";
import { getIconUrl } from "../../utils";

const Auth = ({ loader, popover }) => {
    const { authMode } = useParams();

    const isLogin = authMode === 'login';

    return(
        <div className="fixed flex justify-center items-center top-0 left-0 w-full h-full gradient-picknsend">
            <img className="absolute z-0 top-4 left-4 -rotate-ps-45" src={getIconUrl('courier-messenger-icon')} width='60' height='60' />
            <img className="absolute z-0 top-8 right-8" src={getIconUrl('delivery-truck-icon')} width='60' height='60' />
            <img className="absolute z-0 bottom-16 right-52 rotate-ps-45" src={getIconUrl('courier-box-icon')} width='60' height='60' />
            <img className="absolute z-0 bottom-8 left-52 -rotate-ps-45" src={getIconUrl('courier-mail-icon')} width='60' height='60' />
            <div className="relative z-10 grid grid-cols-12 surface p-0 max-w-6xl w-full max-h-98 h-full mx-4">
                <div className="col-span-5 flex justify-center items-center rounded-tl-md rounded-bl-md  bg-gray-100">
                    <Link to='/'>
                        <Logo />
                    </Link>
                </div>
                <div className="col-span-7 flex justify-center">
                    {isLogin ? <Login 
                        {...loader.getStateLoaderProps()}
                        {...popover.getStatePopoverProps()}
                    /> : 
                    <Signup
                        {...loader.getStateLoaderProps()}
                        {...popover.getStatePopoverProps()}
                    />}
                </div>
            </div>
        </div>
    );
}

const RequiredAuth = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();

    return !auth.data ? <Navigate to="/" state={{ from: location }} replace /> : children;
}

export default Auth

export {
    RequiredAuth
}
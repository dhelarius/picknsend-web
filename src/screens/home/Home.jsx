import { Link } from "react-router-dom";
import Logo from "../../components/common/Logo/Logo";

const Home = () => {
    return(
        <div className="fixed flex flex-col justify-center items-center top-0 left-0 w-full h-full">
            <div className="mb-4">
                <Logo />
            </div>
            <p className="text-lg subtitle subtitle-lg">Sistema de gestión</p>
            <div className="flex gap-5 mt-8">
                <Link to='/login'>
                    <button className="btn btn-picknsend shadow-none text-xl px-8 h-16">Iniciar sesion</button>
                </Link>
                <Link to='/signup'>
                    <button 
                        className="border-2 border-picknsend text-picknsend hover:bg-picknsend hover:text-white rounded-md text-xl font-medium px-8 h-16">
                        Registrarse
                    </button>
                </Link>
            </div>
            <div className="absolute bottom-8 w-full text-center">
                <hr className="mx-auto mb-8 w-8/12" />
                <p className="subtitle">picknsend © 2022</p>
            </div>
        </div>
    );
}

export default Home
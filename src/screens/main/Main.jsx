import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context";

const Main = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const profile = auth.profile;

    return (
        <>
            <h1>Hello, {profile?.user.username}!</h1>
            <button 
                onClick={() => {
                    auth.signout(() => navigate("/"));
                }}
            >
                Cerrar Sesion
            </button>
        </>
    );
}

export default Main
import React from "react";
import { authService } from "../../service";

const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);

    const login = (data, success, error) => {
       authService.login(data).then(response => {
            setUser(response.data);
            success('Sesión iniciada!');
        }).catch(err => {
            let message = typeof err.response !== undefined ? err.response.data : err.message;
            console.warn(message);
            error(message === 'Unauthorized' ? 'Usuario no autorizado' : message);
        });
    };

    const signout = () => {
        authService.signout().then(response => setUser(null));
    }

    const value = { user, login, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export {
    AuthContext,
    AuthProvider
}
import React from "react";
import { authService, sendToken } from "../../service";

const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
    const [data, setData] = React.useState(null);
    const [profile, setProfile] = React.useState(null);

    const login = (data, success, error, callback) => {
       authService.login(data).then(response => {
            setData(response.data);
            sendToken(response.data.token);
            findProfile();
            success('Sesión iniciada!');
            callback();
        }).catch(err => {
            let message = typeof err.response !== undefined ? err.response.data : err.message;
            console.warn(message);
            error(message === 'Unauthorized' ? 'Usuario no autorizado' : message);
            callback();
        });
    };

    const session = async () => {
        const result = await authService.session();
        const sess = result.data;
        if(sess.token) {
            setData(sess);
            sendToken(sess?.token);
            findProfile();
        }
    }

    const findProfile = () => {
        authService.profile().then(response => setProfile(response.data));
    }

    const signout = (callback) => {
        authService.signout().then(response => {
            setData(null);
            callback();
        });
    }

    const value = { data, profile, session, login, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export {
    AuthContext,
    AuthProvider
}
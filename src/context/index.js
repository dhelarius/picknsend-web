import React from "react"
import { AuthContext } from "./provider/AuthProvider";

const useAuth = () => {
    return React.useContext(AuthContext);
}

export {
    useAuth
}
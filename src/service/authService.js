import { authInstance } from "../config/axios";
import http from "../config/http";

const auth = http(authInstance);

const signup = (data) => auth.post('/signup', data);

const login = (data) => auth.post('/login', data);

const signout = () => auth.get('/logout');

export default {
    signup,
    login,
    signout
}
import { authInstance } from "../config/axios";
import http from "../config/http";

const auth = http(authInstance);

const signup = (data) => auth.post('/signup', data);

const login = (data) => auth.post('/login', data);

const session = () => auth.get('/session');

const profile = () => auth.get('/user/profile');

const signout = () => auth.get('/logout');

export default {
    signup,
    login,
    session,
    profile,
    signout
}
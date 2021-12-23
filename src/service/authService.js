import { authInstance } from "../config/axios";
import http from "../config/http";

const auth = http(authInstance);

const signup = (data) => auth.post('/signup', data);

export {
    signup
}
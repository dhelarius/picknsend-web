import axios from "axios"
import { vite } from "./env";

const { 
    authApiUrl, 
    customerApiUrl, 
    timeout 
} = vite;

function createInstance(baseURL) {
    return axios.create({
        baseURL,
        timeout: timeout,
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    });
}

const authInstance = createInstance(authApiUrl);

const customerInstance = createInstance(customerApiUrl);

const sendToken = (token) => {
    authInstance.interceptors.request.use(config => {
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    })
}

export {
    sendToken,
    authInstance,
    customerInstance
}
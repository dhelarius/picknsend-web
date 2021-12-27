import axios from "axios"
import { vite } from "./env";

const { 
    authApiUrl, 
    customerApiUrl, 
    timeout 
} = vite;

function createInstance(baseURL, token = null) {
    return axios.create({
        baseURL,
        timeout: timeout,
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

const authInstance = createInstance(authApiUrl);

const customerInstance = createInstance(customerApiUrl);

export {
    authInstance,
    customerInstance
}
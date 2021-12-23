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
        headers: {'content-type': 'application/json'}
    });
}

/*const customerInstance = axios.create({
    baseURL: customerApiUrl,
    timeout: timeout,
    headers: {'content-type': 'application/json'}
});*/

const authInstance = createInstance(authApiUrl);

const customerInstance = createInstance(customerApiUrl);

export {
    authInstance,
    customerInstance
}
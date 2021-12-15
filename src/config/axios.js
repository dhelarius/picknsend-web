import axios from "axios"
import { vite } from "./env";

const { apiUrl, timeout } = vite;

const instance = axios.create({
    baseURL: apiUrl,
    timeout: timeout,
    headers: {'content-type': 'application/json'}
});

export default instance
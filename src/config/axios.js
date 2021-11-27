import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    timeout: 15000,
    headers: {'content-type': 'application/json'}
});

export default instance
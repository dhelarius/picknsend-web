import axios from "./axios";

const http = {
    get: (url) => axios.get(url),

    post: (url, body) => axios.post(url, body),
    
    delete: (url) => axios.delete(url)
}

export default http
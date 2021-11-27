import axios from "./axios";

const http = {
    get: (url) => axios.get(url),
    
    delete: (url) => axios.delete(url)
}

export default http
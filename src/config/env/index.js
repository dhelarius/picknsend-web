const { VITE_API_URL, VITE_TIMEOUT } = import.meta.env;

const vite = {
    apiUrl: VITE_API_URL,
    timeout: VITE_TIMEOUT 
}

export { vite }
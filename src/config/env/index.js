const { VITE_AUTH_API_URL, VITE_CUSTOMER_API_URL, VITE_TIMEOUT } = import.meta.env;

const vite = {
    authApiUrl: VITE_AUTH_API_URL,
    customerApiUrl: VITE_CUSTOMER_API_URL,
    timeout: VITE_TIMEOUT 
}

export { vite }
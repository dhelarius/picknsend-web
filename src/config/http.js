const http = (instance) => {
   return {
        get: (url) => instance.get(url),

        post: (url, body) => instance.post(url, body),

        put: (url, body) => instance.put(url, body),
    
        delete: (url) => instance.delete(url)
   }
}

export default http
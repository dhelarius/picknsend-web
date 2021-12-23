import { useState } from "react"

const useLoader = () => {
    const [open, setOpen] = useState(false);

    const handleOpenLoader = () => {
        setOpen(true);
    }

    const handleCloseLoader = () => {
        setOpen(false);
    }

    const loader =  {
        getLoaderProps: () => { return { open } },

        getStateLoaderProps: () => {
            return { 
                handleOpenLoader,
                handleCloseLoader
            }
        }
    }

    return {
        loader
    }
}

export {
    useLoader
}
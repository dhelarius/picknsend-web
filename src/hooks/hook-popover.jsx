import { useState } from "react";

const usePopover = (props) => {
    const [openPopover, setOpenPopover] = useState(false);
    const [msg, setMessage] = useState('');

    const handleOpenPopover = () => {
        setOpenPopover(true);
    }

    const handleClosePopover = () => {
        setOpenPopover(false);
    }

    const { severity, message, align, duration } = props;

    const popoverProps = {
        open: openPopover,
        severity,
        message: message ? message : msg,
        align,
        duration
    }

    return { 
        handleOpenPopover, 
        handleClosePopover,
        popoverProps,
        setMessage
    }
}

export { usePopover }
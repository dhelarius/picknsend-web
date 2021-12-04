import { useState } from "react";

const usePopover = (props) => {
    const [openPopover, setOpenPopover] = useState(false);

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
        message,
        align,
        duration
    }

    return { 
        handleOpenPopover, 
        handleClosePopover,
        popoverProps
    }
}

export { usePopover }
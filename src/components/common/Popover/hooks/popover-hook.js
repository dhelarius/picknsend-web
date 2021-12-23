import { useState } from "react";

const usePopover = (props) => {
    const [open, setOpen] = useState(false);
    const [messagePopover, setMessage] = useState('');
    const [alignPopover, setAlign] = useState('');
    const [severityPopover, setSeverity] = useState('');
    const [durationPopover, setDuration] = useState(0);

    const handleOpenPopover = () => {
        setOpen(true);
    }

    const handleClosePopover = () => {
        setOpen(false);
    }

    let { severity, message, align, duration } = props;

    const getPopoverProps = {
        open,
        severity: severity ? severity : severityPopover,
        message: message ? message : messagePopover,
        align: align ? align : alignPopover,
        duration: duration ? duration : durationPopover
    }

    const popover = {
        getStatePopoverProps: () => {
            return {
                handleOpenPopover, 
                handleClosePopover,
                setMessage,
                setSeverity,
                setAlign,
                setDuration
            }
        },

        getPopoverProps: () => {
            return {
                open,
                onClose: handleClosePopover,
                severity: severity ? severity : severityPopover,
                message: message ? message : messagePopover,
                align: align ? align : alignPopover,
                duration: duration ? duration : durationPopover
            }
        }
    }

    return { 
        handleOpenPopover, 
        handleClosePopover,
        setMessage,
        setSeverity,
        setAlign,
        setDuration,
        popover,
        getPopoverProps
    }
}

export { usePopover }
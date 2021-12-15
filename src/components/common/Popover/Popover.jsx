import { CheckCircleIcon, ExclamationCircleIcon, ExclamationIcon, XIcon } from "@heroicons/react/solid";
import Expire from "../Expire";
import './Popover.css'

const status = {
    success: 'success',
    warning: 'warning',
    error: 'error'
}

const alignment = {
    left: 'left',
    center: 'center',
    right: 'right'
}

const Popover = ({ open, onClose, severity, align, message, duration }) => {

    let icon = null;
    let background = null;
    let text = null;
    let bgClose = null;

    const { success, warning, error } = status;

    switch(severity) {
        case success:
            icon = <CheckCircleIcon />;
            background = 'bg-green-100 text-green-700';
            text = 'text-green-700';
            bgClose = 'hover:bg-green-200'
        break;

        case warning:
            icon = <ExclamationIcon />;
            background = 'bg-yellow-100 text-yellow-700';
            text = 'text-yellow-700';
            bgClose = 'hover:bg-yellow-200'
        break;

        case error:
            icon = <ExclamationCircleIcon />;
            background = 'bg-red-100 text-red-700';
            text = 'text-red-700';
            bgClose = 'hover:bg-red-200'
    }

    const position = align === alignment.left ? 'left-4' :
                     align === alignment.center ? 'center-fixed' :
                     'right-4'

    return (
        <>
        {open && <Expire delay={duration} callback={onClose}>
        <div 
            className={["fixed flex items-center gap-2 h-12 px-4 rounded-md shadow-md animate-translate", background, position].join(' ')} 
            style={{ animationDuration: `${duration}ms` }}    
        >
            <div className={["w-6 h-6", text].join(' ')}>
                {icon}
            </div>
            {message}
            {onClose && <div 
                className={`w-5 h-5 p-1 rounded-full ${bgClose}`}
                onClick={() => { onClose(); }}
            ><XIcon /></div>}
        </div>
        </Expire>}
        </>
    );
}

export default Popover
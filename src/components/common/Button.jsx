import { classNames } from "../../shared/utils";

const Button = ({ children, className, ...rest }) => {
    return (
        <button
            type="button"
            className={classNames("btn", className)}
            {...rest}
        >
            {children}
        </button>
    );
}

const PicknsendButton = ({ children, className, ...rest }) => {
    return (
        <>
            <Button
                className={`btn-picknsend ${className}`}
                rest={rest}
            >
                {children}
            </Button>
        </>
    );
}

export { 
    PicknsendButton,  
    Button
}
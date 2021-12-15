import { classNames, severityStatus } from "../../shared/utils";
import { Button } from "../common/Button"
import { SeverityIcon } from "./Icon/Icon";

const Dialog = (props) => {
    const { className, children } = props;

    return (
        <>
            <div className={classNames("bg-modal", className)}>
                <div className="surface">
                    <div>{children}</div>
                </div>
            </div>
        </>
    );
}

const SeverityDialog = (props) => {
    const { open, className, title, message, onClose, severity } = props;

    const { success, warning, error } = severityStatus;

    let styleButton = 'mt-4 w-24';

    switch(severity) {
        case success:
            styleButton = styleButton.concat(' btn-text-success');
        break;

        case warning:
            styleButton = styleButton.concat(' btn-text-warning');
        break;

        case error:
            styleButton = styleButton.concat(' btn-text-error');
        break;
    }

    return (
        <>
            {open && <Dialog className={classNames("text-center", className)}>
                <SeverityIcon className="w-12 h-12 my-2 mx-auto" severity={severity} />
                <p className="text-lg font-semibold text-gray-900">{title}</p>
                <p className="text-md text-gray-600">{message}</p>
                <Button 
                    className={styleButton}
                    onClick={onClose}
                >
                    OK
                </Button>
            </Dialog>}
        </>
    );
}

export { SeverityDialog }

export default Dialog
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationIcon } from "@heroicons/react/solid";
import { classNames, severityStatus } from "../../../shared/utils";

const SeverityIcon = ({ className, severity }) => {

    const { success, warning, error } = severityStatus;

    let icon = null;
    let style = '';

    switch(severity) {
        case success: 
            icon = <CheckCircleIcon />;
            style = "text-success";
        break;

        case warning:
            icon = <ExclamationIcon />;
            style = "text-warning";
        break;

        case error:
           icon = <ExclamationCircleIcon />;
           style = "text-error";
        break;
    }

    return (
        <>
            <div className={classNames(`w-6 h-6 ${style}`, className)}>
                {icon}
            </div>
        </>
    );
}

export { SeverityIcon }
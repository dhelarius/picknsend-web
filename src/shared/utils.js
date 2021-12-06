export function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const severityStatus =  {
    success: 'success',
    warning: 'warning',
    error: 'error'
}

export { 
    severityStatus
}
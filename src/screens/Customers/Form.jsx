import Form from "../../components/Customers/Form";

const CustomerForm = ({ 
    open, 
    onClose, 
    onUpdate, 
    onLoader, 
    handlePopover,
    getCustomerProps
}) => {
    return (
        <>
            {open && <div className="bg-modal">
                <div className="sm:max-w-screen-md w-full">
                    <Form
                        onClose={onClose} 
                        onLoader={onLoader} 
                        onUpdate={onUpdate} 
                        handlePopover={handlePopover}
                        {...getCustomerProps}
                    />
                </div>
            </div>}
        </>
    );
}

export { CustomerForm }
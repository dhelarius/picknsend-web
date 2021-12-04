const Ellipsis = () => {
    return (
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    );
}

const Loader = ({ open/*, onClose*/ }) => {
    //const timeOut = setTimeout(() => {onClose();}, 3000);
    
    return (
        <>
            {open && <div className="bg-modal bg-white z-50">
                <div className="flex justify-center items-center min-h-full">
                    <Ellipsis />
                </div>
            </div>}
        </>
    );
}

export default Loader
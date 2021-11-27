const Loader = () => {
    return (
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    );
}

const LoaderModal = ({ loading, hideLoader }) => {
    const timeOut = setTimeout(() => {hideLoader();}, 3000);
    
    return (
        <>
            {loading && <div className="bg-modal">
                <div className="flex justify-center items-center min-h-full">
                    <Loader />
                </div>
            </div>}
        </>
    );
}

export { Loader }

export default LoaderModal
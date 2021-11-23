const Loader = ({ hideLoader }) => {

    const timeOut = setTimeout(() => {hideLoader();}, 3000);

    return (
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    );
}

const LoaderModal = ({ hideLoader }) => {
    return (
        <div className="bg-modal">
            <div className="flex justify-center items-center min-h-full">
                <Loader hideLoader={hideLoader} />
            </div>
        </div>
    );
}

export { LoaderModal }

export default Loader
import { deleteCustomer } from "../hooks/customer";

const DeleteDialog = ({ open, handleClose, handleDeleted, customer }) => {
    const { npsv } = customer

    const handleDelete = () => {
        deleteCustomer(npsv);
        handleDeleted();
        handleClose();
    }

    return (
        <>
            {open && <div className="bg-modal">
                <div className="surface w-104">
                    <div className="mb-5">
                        <p className="mb-2 text-xl text-gray-700 font-medium">Eliminar este elemento?</p>
                        <p className="text-gray-600 text-md">Está seguro de que desea eliminar este elemento</p>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button 
                            className="btn"
                            onClick={handleClose}
                        >Cancelar</button>
                        <button 
                            className="btn btn-error"
                            onClick={handleDelete}
                        >Eliminar</button>
                    </div>
                </div>
            </div>}
        </>
    );
}

export default DeleteDialog
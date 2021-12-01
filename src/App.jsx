import React, { useState } from 'react'
import './App.css'
import CustomerForm, { CustomerFormModal } from './components/CustomerForm';
import Loader from './components/Loader';
import Table, { Actions, StatusPill } from './components/Table';
import { staticData } from './static/staticValues';
import { useCustomers } from './hooks/customer';

function App() {
  const [deleted, setDeleted] = useState(false);
  const [isCustomerModal, setCustomerModal] = useState(false);
  const [openLoader, setOpenLoader] = useState(false);

  const showCustomerModal = () => {
    setCustomerModal(true);
  }

  const hideCustomerModal = () => {
    setCustomerModal(false)
  }

  const handleDeleted = (isDeleted) => {
    setDeleted(isDeleted);
  }

  const loaderProps = {
    handleOpenLoader: () => setOpenLoader(true),
    handleCloseLoader: () => setOpenLoader(false)
  }

  const columns = React.useMemo(() => [
    { Header: "Npsv", accessor: "npsv" },
    { Header: "Nombre", accessor: "name" },
    { Header: "Apellido", accessor: "lastName" },
    { Header: "Dirección", accessor: "address" },
    { Header: "Teléfono", accessor: "phone" },
    { Header: "Cédula", accessor: "dni" },
    { Header: "Email", accessor: "email" },
    { Header: "Fecha", accessor: "creationDate" },
    { Header: "Estado", accessor: "status", Cell: StatusPill },
    { 
      Header: "Acciones", 
      Cell: Actions,
      npsvAccessor: "npsv",
      nameAccessor: "name",
      lastnameAccessor: "lastName",
      addressAccesor: "address",
      phoneAccessor: "phone",
      dniAccessor: "dni",
      emailAccessor: "email",
      statusAccessor: "status",
      handleDeleted: handleDeleted,
      loaderProps: loaderProps
    }
  ], 
  [])

  const data = useCustomers(deleted);

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-dark">
        <main className="sm:px-6 lg:px-8 pt-4">
          <div className="mt-4">
            <Table columns={columns} data={data} showCustomerModal={showCustomerModal} />
          </div>
        </main>
      </div>
      {/*isCustomerModal && <CustomerFormModal hideCustomerModal={hideCustomerModal} showLoader={showLoader} />*/}
      <Loader open={openLoader} />
    </>
  )
}

export default App

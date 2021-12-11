import React, { useEffect, useState } from 'react'
import './App.css'
import CustomerForm, { CustomerFormDialog } from './components/CustomerForm';
import Loader from './components/Loader';
import Table, { Actions, StatusPill } from './components/Table';
import { staticData } from './static/staticValues';
import { useFindAllCustomers} from './hooks/hook-customer';
import Popover from './components/common/Popover/Popover';
import { usePopover } from './hooks/hook-popover';
import Dialog, { SeverityDialog } from './components/common/Dialog';

function App() {
  const [deleted, setDeleted] = useState(false);
  const [update, setUpdate] = useState(false);
  const [openCustomerForm, setOpenCustomerForm] = useState(false);
  const [openLoader, setOpenLoader] = useState(false);

  const showCustomerModal = () => {
    setCustomerModal(true);
  }

  const hideCustomerModal = () => {
    setCustomerModal(false)
  }

  const handleDeleted = (deleted) => {
    setDeleted(deleted);
  }

  const handleUpdate = () => {
    setUpdate(!update);
  }

  const handleOpenCustomerForm = () => {
    setOpenCustomerForm(true);
  }

  const handleCloseCustomerForm = () => {
    setOpenCustomerForm(false);
  }

  const loaderProps = {
    handleOpenLoader: () => setOpenLoader(true),
    handleCloseLoader: () => setOpenLoader(false)
  }

  const { 
    handleOpenPopover, 
    handleClosePopover,
    setMessage,
    setSeverity,
    setAlign,
    setDuration, 
    popoverProps 
  } = usePopover({});

  const handlePopover = {
    handleOpenPopover,
    setMessage,
    setSeverity,
    setAlign,
    setDuration
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
      handleDeleted,
      handlePopover,
      loaderProps: loaderProps
    }
  ], 
  [])

  const data = useFindAllCustomers(deleted, update);

  useEffect(() => {
    console.log(`deleted: ${deleted}`);
  }, [deleted]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-dark">
        <main className="sm:px-6 lg:px-8 pt-4">
          <div className="mt-4">
            <Table columns={columns} data={data} onDialog={handleOpenCustomerForm} />
          </div>
        </main>
      </div>
      <Loader open={openLoader} />
      <Popover 
        onClose={handleClosePopover}
        {...popoverProps}
      />
      <CustomerFormDialog 
        open={openCustomerForm} 
        onClose={handleCloseCustomerForm}
        onUpdate={handleUpdate}
        onLoader={setOpenLoader}
        handlePopover={handlePopover}
      />
      {/*<Dialog title="Prueba" message="Esta es una prueba de dialog!" />*/}
      {/*<SeverityDialog 
        open={true} 
        onClose={() => console.log('Close dialog!')} 
        title="Prueba" 
        message="Esta es una prueba de dialog!" 
        severity="success" 
      />*/}
    </>
  )
}

export default App

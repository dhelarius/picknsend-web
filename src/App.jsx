import React, { useState } from 'react'
import './App.css'
import CustomerForm from './components/CustomerForm';
import Table, { Actions, StatusPill } from './components/Table';
import { staticData } from './static/staticValues';

function App() {
  const [isCustomerModal, setCustomerModal] = useState(false);

  const showCustomerModal = () => {
    setCustomerModal(true);
  }

  const hideCustomerModal = () => {
    setCustomerModal(false)
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
    { Header: "Acciones", accessor: "actions", Cell: Actions }
  ], 
  [])

  const data = React.useMemo(() => staticData(), []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-dark">
        <main className="sm:px-6 lg:px-8 pt-4">
          <div className="mt-4">
            <Table columns={columns} data={data} showCustomerModal={showCustomerModal} />
          </div>
        </main>
      </div>
      {isCustomerModal && 
      <div className="fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-gray-700 bg-opacity-30 px-4">
        <div className="relative top-7 sm:top-1/4">
          <CustomerForm hideCustomerModal={hideCustomerModal} />
        </div>
      </div>}
    </>
  )
}

export default App

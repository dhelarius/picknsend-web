import React, { useState } from 'react'
import './App.css'
import { PicknsendButton } from './components/Button';
import CustomerForm from './components/CustomerForm';
import Table, { Actions, StatusPill } from './components/Table';
import { staticData } from './static/staticValues';

function App() {
    const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);

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
      {/*<div className="min-h-screen bg-gray-100 text-gray-dark">
        <main className="sm:px-6 lg:px-8 pt-4">
          <div className="mt-4">
            <Table columns={columns} data={data} />
          </div>
        </main>
  </div>*/}
      {/*<div className="flex items-center min-h-screen bg-gray-700 bg-opacity-10 text-gray-dark pt-4">
          <CustomerForm />
    </div>*/}
    <div className="flex items-center justify-center">
      <div className="absolute z-10 top-2/4 bottom-2/4">
        <PicknsendButton
          onClick={() => setShowNewCustomerModal(true)}
        >
          NUEVO CLIENTE
        </PicknsendButton>
      </div>
      {showNewCustomerModal && 
      <div className="z-20 min-h-screen min-w-full bg-gray-700 bg-opacity-20 text-gray-dark">
        <CustomerForm />
      </div>}
      </div>
    </>
  )
}

export default App

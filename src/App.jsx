import React, { useState } from 'react'
import './App.css'
import Table, { Actions, StatusPill } from './components/Table';
import { staticData } from './static/staticValues';

function App() {
  const [count, setCount] = useState(0)

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
    <div className="min-h-screen bg-gray-100 text-gray-dark">
      <main className="sm:px-6 lg:px-8 pt-4">
        <div className="mt-4">
          <Table columns={columns} data={data} />
        </div>
      </main>
    </div>
  )
}

export default App

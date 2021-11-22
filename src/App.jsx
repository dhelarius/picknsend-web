import React, { useState } from 'react'
import './App.css'
import Table, { Actions } from './components/Table';
import { staticData } from './static/staticValues';

function App() {
  const [count, setCount] = useState(0)

  const columns = React.useMemo(() => [
    { Header: "Npsv", accessor: "npsv" },
    { Header: "Name", accessor: "name" },
    { Header: "LastName", accessor: "lastName" },
    { Header: "Address", accessor: "address" },
    { Header: "Phone", accessor: "phone" },
    { Header: "DNI", accessor: "dni" },
    { Header: "Email", accessor: "email" },
    { Header: "CreationDate", accessor: "creationDate" },
    { Header: "Status", accessor: "status" },
    { Header: "Actions", accessor: "actions", Cell: Actions }
  ], 
  [])

  const data = React.useMemo(() => staticData(), []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-dark">
      <main className="max-w-4xl mx-auto sm:px-6 lg:px-8 pt-4">
        <div className="mt-4">
          <Table columns={columns} data={data} />
        </div>
      </main>
    </div>
  )
}

export default App

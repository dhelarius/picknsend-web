import React, { useState } from 'react'
import './App.css'
import Table from './components/Table';
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
    { Header: "Status", accessor: "status" }
  ], 
  [])

  const data = React.useMemo(() => staticData(), []);

  return (
    <div className="App">
      <div>
        <Table columns={columns} data={data} />
      </div>
    </div>
  )
}

export default App

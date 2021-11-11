import React from 'react';
import { useState } from 'react'
import './App.css'
import Table from './components/Table';
import { staticData } from './config/staticValues'

function App() {
  const [count, setCount] = useState(0)

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Role",
        accessor: "role",
      },
    ],
    []
  );

  const data = React.useMemo(() => staticData(), [])

  return (
    <div className="App">
      <div>
        <Table columns={columns} data={data} />
      </div>
    </div>
  )
}

export default App

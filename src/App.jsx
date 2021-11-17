import React, { useState } from 'react';
import './App.css'
import Table, { SelectColumnFilter } from './components/Table';
import { staticData } from './config/staticValues'

function App() {

  const columns = React.useMemo(() => [
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Title",
        accessor: "title"
      },
      {
        Header: "Status",
        accessor: "status"
      },
      {
        Header: "Age",
        accessor: "age"
      },
      {
        Header: "Role",
        accessor: "role",
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
    ], [])

  const data = React.useMemo(() => staticData(), [])

  return (
    <div className="App">
      <h1>Hello React Table!</h1>
      <div>
        <Table columns={columns} data={data} />
      </div>
    </div>
  )
}

export default App

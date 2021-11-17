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
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
          <h1 className="text-xl font-semibold">React Table + Tailwind CSS = ❤</h1>
        </div>
        <div className="mt-4">
          <Table columns={columns} data={data} />
        </div>
      </main>
    </div>
  )
}

export default App

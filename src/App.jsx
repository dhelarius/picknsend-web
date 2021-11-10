import React, { useState } from 'react'
import './App.css'
import Table from './components/Table'
import staticData from './config/staticData';

function App() {
  const [count, setCount] = useState(0)

  const columns = React.useMemo(
    () => [
        {
            Header: 'ID',
            accessor: 'id'
        },
        {
            Header: 'NPSV',
            accessor: 'npsv'
        },
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'Lastname',
            accessor: 'lastname'
        },
        {
            Header: 'DNI',
            accessor: 'dni'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Creation date',
            accessor: 'creationDate'
        },
        {
            Header: 'Status',
            accessor: 'status'
        }
    ],
    []
  );

  const data = React.useMemo(() => staticData, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
      {/*<div className="content">
        <p className="text">React Template</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        </div>*/}
    </div>
  )
}

export default App

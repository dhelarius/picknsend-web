// src/Table.js
import React from "react";
import 'regenerator-runtime'
import { useTable, useGlobalFilter, useAsyncDebounce, useFilters, useSortBy } from "react-table";

// Define a default UI for filtering
const GlobalFilter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter
}) => {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return(
        <span>
            Search: {' '}
            <input 
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </span>
    )
}

// This is a custom filter UI for selecting
// a unique option from a list
const SelectColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id }
}) => {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach(row => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    return(
        <select
            name={id}
            id={id}
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined);
            }}
        >
            <option value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

const Table = ({ columns, data }) => {
    // Use the state and functions returned from useTable to build your UI
    const instanceTable = useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy);
  
    const { 
        getTableProps, 
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter
    } = instanceTable;

  // Render the UI for your table
  return (
    <>
        <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
        />
        {headerGroups.map((headerGroup) =>
            headerGroup.headers.map((column) =>
            column.Filter ? (
                <div key={column.id}>
                <label htmlFor={column.id}>{column.render("Header")}: </label>
                {column.render("Filter")}
                </div>
            ) : null
            )
        )}
        <table {...getTableProps()} border="1">
            <thead>
                {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                    // Add the sorting props to control sorting. For this example
                    // we can add them into the header props
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render("Header")}
                        {/* Add a sort direction indicator */}
                        <span>
                        {column.isSorted
                            ? column.isSortedDesc
                                ? ' ▼'
                                : ' ▲'
                            : ''}
                        </span>
                    </th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    })}
                    </tr>
                );
                })}
            </tbody>
        </table>
        <div>
            <pre>
                <code>{JSON.stringify(state, null, 2)}</code>
            </pre>
        </div>
    </>
  );
}

export { SelectColumnFilter }

export default Table
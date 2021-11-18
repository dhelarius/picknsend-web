// src/Table.js
import React from "react";
import 'regenerator-runtime'
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useTable, useGlobalFilter, useAsyncDebounce, useFilters, useSortBy, usePagination } from "react-table";

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
    const instanceTable = useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy, usePagination);
  
    const { 
        getTableProps, 
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,

        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,

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
        <div className="mt-2 flex flex-col">
            <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                    <th 
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                    >
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
                            <tbody
                                {...getTableBodyProps()}
                                className="bg-white divide-y divide-gray-200"
                            >
                                {page.map(row => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td 
                                                {...cell.getCellProps()}
                                                className="px-6 py-4 whitespace-nowrap"
                                            >{cell.render("Cell")}</td>
                                        );
                                    })}
                                    </tr>
                                );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        {/* PAGINATION V2 */}

        <div className="bg-gray-100 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            <a
              href="#"
              aria-current="page"
              className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              1
            </a>
            <a
              href="#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              2
            </a>
            <a
              href="#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              ...
            </span>
            <a
              href="#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
            >
              8
            </a>
            <a
              href="#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              9
            </a>
            <a
              href="#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              10
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>

        {/* END PAAGINATION V2 */}

        {/* PAGINATION */}
        <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {state.pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <select
          value={state.pageSize}
          onChange={e => {
              setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 20].map(pageSize => (
              <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      {/* END PAGINATION */}
        {/*<div>
            <pre>
                <code>{JSON.stringify(state, null, 2)}</code>
            </pre>
        </div>*/}
    </>
  );
}

export { SelectColumnFilter }

export default Table
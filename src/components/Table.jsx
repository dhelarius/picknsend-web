import React from "react";
import "regenerator-runtime";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useTable, useGlobalFilter, useSortBy, useAsyncDebounce, usePagination } from "react-table";

const GlobalFilter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter
}) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200);

    return (
        <span>
          Search:{' '}
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

const Actions = ({ value }) => {
    return (
        <div className="flex gap-x-2">
            <button className="text-blue hover:bg-gray-100 px-6 py-2 rounded-md">EDITAR</button>
            <button className="text-error hover:bg-gray-100 px-6 py-2 rounded-md">ELIMINAR</button>
        </div>
    );
}

const Table = ({ columns, data }) => {

    const instance = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,

        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

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
    } = instance;

    return (
        <>
            <div className="flex justify-between">
                <GlobalFilter 
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
                <button className="bg-picknsend px-6 py-2 text-sm rounded-md font-bold text-white shadow">NUEVO</button>
            </div>
            <div className="mt-2 flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-md">
                            <table {...getTableProps} className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-white">
                                {
                                    headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {
                                                headerGroup.headers.map(column => (
                                                    <th 
                                                        scope="col"
                                                        className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                                    >
                                                        {column.render('Header')}
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
                                {
                                    page.map(row => {
                                        prepareRow(row)
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {
                                                    row.cells.map(cell => {
                                                        return (
                                                            <td 
                                                                {...cell.getCellProps()}
                                                                className="px-4 py-3 whitespace-nowrap text-sm"
                                                            >
                                                                {cell.render('Cell')}
                                                            </td>
                                                        )
                                                    })}
                                            </tr>
                                        )
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
            {/* END PAGINATION V2 */}

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
        </>
    );
}

export { Actions }

export default Table
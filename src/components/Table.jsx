import React from "react";
import "regenerator-runtime";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon, PlusSmIcon } from "@heroicons/react/solid";
import { useTable, useGlobalFilter, useSortBy, useAsyncDebounce, usePagination } from "react-table";
import { classNames } from "../shared/utils";
import { Button, PageButton } from "./Button";
import { SortDownIcon, SortIcon, SortUpIcon } from "./Icons";

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
        <label className="flex gap-x-2 items-baseline">
            <span className="text-gray-700">
                Buscar:{' '}
                <input
                    type="text"
                    className="mt-1 block-w-full rounded-md border-gray-300 shadow-sm focus:border-picknsend focus:ring focus:ring-picknsend-light focus:ring-opacity-50"
                    value={value || ""}
                    onChange={e => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder={`${count} registros...`}
                />
            </span>
        </label>
      )
}

const StatusPill = ({ value }) => {
    const status = value ? value.toLowerCase() : "unknown";

    const text = status.startsWith("a") ?  "Activo" : "Inactivo";

    return (
        <span
          className={classNames(
            "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
            status.startsWith("a") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          )}
        >
          {text}
        </span>
    );
}

const Actions = ({ value }) => {
    return (
        <div className="flex gap-x-2">
            <button onClick={() => console.log(`Editar ${value}`)} className="text-blue hover:bg-gray-100 px-4 py-2 rounded-md">EDITAR</button>
            <button onClick={() => console.log(`Eliminar ${value}`)} className="text-error hover:bg-gray-100 px-4 py-2 rounded-md">ELIMINAR</button>
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
                <button className="flex items-center bg-picknsend hover:bg-picknsend-dark px-4 text-xs font-medium rounded-md text-white shadow">
                    <PlusSmIcon className="h-6 w-6" />
                 NUEVO
                </button>
            </div>
            <div className="mt-2 flex flex-col">
                <div className="-my-2 sm:-mx-6 lg:-mx-8">
                    <div className="py-2 overflow-x-auto align-middle inline-block min-w-full sm:px-6 lg:px-8">
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
                                                        className="group px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            {column.render('Header')}
                                                            <span>
                                                                {column.isSorted
                                                                ? column.isSortedDesc
                                                                ? <SortDownIcon className="w-4 h-4 text-gray-400" />
                                                                : <SortUpIcon className="w-4 h-4 text-gray-400" />
                                                                : (
                                                                    <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                                                                )}
                                                            </span>
                                                        </div>
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
                                                                className="px-4 py-1 whitespace-nowrap"
                                                            >
                                                                <div className="text-xs text-gray-500">{cell.render('Cell')}</div>
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
            {/* PAGINATION */}
            <div className="py-3 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                    <Button onClick={() => previousPage()} disabled={!canPreviousPage}>Anterior</Button>
                    <Button onClick={() => nextPage()} disabled={!canNextPage}>Siguiente</Button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div className="flex gap-x-2 items-center">
                        <span className="text-sm text-gray-700">
                            Página <span className="font-medium">{state.pageIndex + 1}</span> de <span className="font-medium">{pageOptions.length}</span>
                        </span>
                        <label>
                            <span className="sr-only">Elemento Por Página</span>
                            <select
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-picknsend focus:ring focus:ring-picknsend-light focus:ring-opacity-50"
                                value={state.pageSize}
                                onChange={e => {
                                    setPageSize(Number(e.target.value))
                                }}
                            >
                                {[5, 10, 20].map(pageSize => (
                                    <option key={pageSize} value={pageSize}>
                                        Mostrar {pageSize}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            <PageButton
                                className="rounded-l-md"
                                onClick={() => gotoPage(0)}
                                disabled={!canPreviousPage}
                            >
                                <span className="sr-only">First</span>
                                <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </PageButton>
                            <PageButton
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </PageButton>
                            <PageButton
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </PageButton>
                            <PageButton
                                className="rounded-r-md"
                                onClick={() => gotoPage(pageCount - 1)}
                                disabled={!canNextPage}
                            >
                                <span className="sr-only">Last</span>
                                <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
                            </PageButton>
                        </nav>
                    </div>
                </div>
            </div>
            {/* END PAGINATION */}
        </>
    );
}

export { StatusPill, Actions }

export default Table
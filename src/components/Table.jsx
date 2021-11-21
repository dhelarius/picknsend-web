import React from "react";
import "regenerator-runtime";
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
            <GlobalFilter 
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <table {...getTableProps}>
            <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
            <tbody {...getTableBodyProps()}>
                {
                    page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })}                        
            </tbody>
            </table>
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

export default Table
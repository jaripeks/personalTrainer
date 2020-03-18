import React from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
    return (
        <div>
            Search table:
            <input
                value={globalFilter || ''}
                onChange={event => {
                    setGlobalFilter(event.target.value || undefined)
                }}
            >
            </input>
        </div>
    )
}

/**
 * General Table component using react-table and material-ui
 * @param { columns } are the columns of the table
 * @param { data } is the data in json format for the table
 */

const Table = ({ columns, data, title }) => {
    //Set up the table hooks
    const {
        getTableProps,
        getTableBodyProps,
        headers,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state,
        state: { pageIndex, pageSize },
        setGlobalFilter
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 5 }
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    )

    return (
        <div>
            <MaUTable {...getTableProps()}>
                <TableHead>
                    <TableRow>
                        <TableCell>{title}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <GlobalFilter
                                globalFilter={state.globalFilter}
                                setGlobalFilter={setGlobalFilter}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        {headers.map(column =>
                            <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                <span>
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? '🔽'
                                            : '🔼'
                                        : ''}
                                </span>
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map(cell =>
                                    <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                                )}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </MaUTable>
            <div className='pagination'>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                {' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</button>
                {' '}Page{' '}<strong>{pageIndex + 1} of {pageOptions.length}</strong>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</button>
                {' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                <div>
                    <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                            {[5, 10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Table
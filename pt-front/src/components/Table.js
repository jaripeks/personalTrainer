import React from 'react'
import { useTable, useSortBy, useGlobalFilter } from 'react-table'
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
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable(
        {
            columns,
            data
        },
        useGlobalFilter,
        useSortBy
    )

    return (
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
                {rows.map((row, i) => {
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
    )
}

export default Table
import React from 'react'
import { useTable } from 'react-table'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'


/**
 * General Table component using react-table and material-ui
 * @param { columns } are the columns of the table
 * @param { data } is the data in json format for the table
 */

const Table = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headers,
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    })
    return (
        <MaUTable {...getTableProps()}>
            <TableHead>
                <TableRow>
                    {headers.map(column =>
                        <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
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
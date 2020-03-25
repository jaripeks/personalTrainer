import React from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { withStyles } from '@material-ui/core/styles'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableToolbar from './TableToolbar'

const HeaderCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  }
}))(TableCell)

/**
 * General Table component using react-table and material-ui
 * @param { columns } are the columns of the table
 * @param { data } is the data in json format for the table
 */

const Table = ({ columns, data, title, addResource }) => {

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
      <TableToolbar
        title={title}
        addResource={addResource}
        globalFilterState={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <MaUTable {...getTableProps()}>
        <TableHead>
          <TableRow>
            {headers.map(column =>
              <HeaderCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? '🔽'
                      : '🔼'
                    : ''}
                </span>
              </HeaderCell>
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
  )
}

export default Table
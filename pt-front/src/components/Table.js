import React from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableToolbar from './TableToolbar'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import EditIcon from '@material-ui/icons/Edit'
import Head from './Head'
import DeleteDialog from './DeleteDialog'
import Paper from '@material-ui/core/Paper'
import AddTrainingDialog from './AddTrainingDialog'

/**
 * General Table component using react-table and material-ui
 * @param columns are the columns of the table
 * @param data is the data in json format for the table
 */

const Table = ({
  defaultColumn,
  columns,
  data,
  updateData,
  skipPageReset,
  title,
  addResource,
  selectedRow,
  selectRow,
  submitEdit,
  cancelEdit,
  deleteRow,
  addTraining
}) => {

  //Set up the table hooks etc
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
      defaultColumn,
      initialState: { pageSize: 5 },
      autoResetPage: !skipPageReset,
      updateData
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const addTrainingButton = (row) => <TableCell><AddTrainingDialog row={row} add={addTraining} /></TableCell>

  const selectedRowButtons = (row) => {
    return (
      <>
        <TableCell>
          <IconButton onClick={() => cancelEdit()}><CancelIcon /></IconButton>
          <IconButton onClick={() => submitEdit()}><CheckCircleIcon /></IconButton>
        </TableCell>
        {addTrainingButton(row)}
      </>
    )
  }

  const rowButtons = (row) => {
    return (
      <>
        <TableCell><IconButton onClick={() => selectRow(row.index)}><EditIcon /></IconButton></TableCell>
        {addTrainingButton(row)}
      </>
    )
  }

  return (
    <Paper>
      <TableToolbar
        title={title}
        addResource={addResource}
        globalFilterState={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <MaUTable {...getTableProps()}>
        <Head updateData={updateData} headers={headers} />
        <TableBody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()}>
                {updateData ?
                  row.index === selectedRow ?
                    selectedRowButtons(row)
                    :
                    rowButtons(row)
                  :
                  null
                }
                {row.cells.map(cell =>
                  <TableCell {...cell.getCellProps()}>{cell.render('Cell', { editable: row.index === selectedRow })}</TableCell>
                )}
                <TableCell><DeleteDialog title={title} content={row.cells} handleDelete={() => deleteRow(row.index)} /></TableCell>
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
        {' '}
        <span>{title}s per page</span>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>

      </div>
    </Paper>
  )
}

export default Table
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const HeaderCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    }
  }))(TableCell)

const Head = ({ updateData, headers }) => {
    return(
        <TableHead>
            <TableRow>
                {updateData ?
                    <>
                        <HeaderCell />
                        <HeaderCell />
                    </>
                    :
                    null
                }
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
                <HeaderCell />
            </TableRow>
        </TableHead>
    )
}

export default Head
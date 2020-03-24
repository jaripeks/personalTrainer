import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import GlobalFilter from './GlobalFilter'
import AddDialog from './AddDialog'

const TableToolbar = ({
    title,
    globalFilterState,
    setGlobalFilter
}) => {
    return (
        <Toolbar>
            <AddDialog title={title} />
            <GlobalFilter
                globalFilter={globalFilterState}
                setGlobalFilter={setGlobalFilter}
            />
        </Toolbar>
    )
}

export default TableToolbar
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import GlobalFilter from './GlobalFilter'
import AddDialog from './AddDialog'

const TableToolbar = ({
    title,
    addResource,
    globalFilterState,
    setGlobalFilter
}) => {
    return (
        <Toolbar>
            {
                addResource ?
                <AddDialog title={title} addResource={addResource} />
                :
                ''
            }
            <GlobalFilter
                globalFilter={globalFilterState}
                setGlobalFilter={setGlobalFilter}
            />
        </Toolbar>
    )
}

export default TableToolbar
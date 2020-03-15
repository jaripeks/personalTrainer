import React from 'react'
import Table from './Table'
import CssBaseline from '@material-ui/core/CssBaseline'

const TrainingsTable = ({ trainings }) => {
    const columns = React.useMemo(() => [
        {
            Header: 'Date',
            accessor: 'date'
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        }
    ], [])

    const data = React.useMemo(() => trainings, [trainings])

    return (
        <div>
            <CssBaseline />
            <Table columns={columns} data={data} />
        </div>
    )
}

export default TrainingsTable
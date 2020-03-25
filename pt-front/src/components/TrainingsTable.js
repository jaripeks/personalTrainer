import React from 'react'
import Table from './Table'
import CssBaseline from '@material-ui/core/CssBaseline'

const TrainingsTable = ({ trainings }) => {
    const columns = React.useMemo(() => [
        {
            Header: 'Date',
            accessor: 'date',
            Cell: ({ cell: { value } }) => {
                const date = Date.parse(value)
                return(
                    new Date(date).toLocaleString()
                )
            }
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            Header: 'Customer',
            accessor: 'customer',
            Cell: ({ cell: { value } }) => `${value.firstname} ${value.lastname}`
        }
    ], [])

    const data = React.useMemo(() => trainings, [trainings])

    const defaultColumn = {}

    return (
        <div>
            <CssBaseline />
            <Table defaultColumn={defaultColumn} columns={columns} data={data} title='Training' />
        </div>
    )
}

export default TrainingsTable
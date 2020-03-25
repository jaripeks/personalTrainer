import React from 'react'
import Table from './Table'
import CssBaseline from '@material-ui/core/CssBaseline'

const CustomersTable = ({ customers, addCustomer }) => {
    const columns = React.useMemo(() => [
        {
            Header: 'Firstname',
            accessor: 'firstname'
        },
        {
            Header: 'Lastname',
            accessor: 'lastname'
        },
        {
            Header: 'Address',
            accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email address',
            accessor: 'email'
        },
        {
            Header: 'Phone number',
            accessor: 'phone'
        }
    ], [])

    const data = React.useMemo(() => customers, [customers])


    return (
        <div>
            <CssBaseline />
            <Table columns={columns} data={data} addResource={addCustomer} title='Customer' />
        </div>
    )
}

export default CustomersTable
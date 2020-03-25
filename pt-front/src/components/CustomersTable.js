import React, { useState, useEffect, useMemo } from 'react'
import Table from './Table'
import CssBaseline from '@material-ui/core/CssBaseline'
import EditableCell from './EditableCell'

const CustomersTable = ({ customers, customersService, updateCustomer }) => {

    const [skipPageReset, setSkipPageReset] = useState(false)
    useEffect(() => {
        setSkipPageReset(false)
    }, [customers])

    const update = (rowIndex, columnId, value) => {
        setSkipPageReset(true)
        updateCustomer(rowIndex, columnId, value)
    }

    const columns = useMemo(() => [
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

    const data = useMemo(() => customers, [customers])

    const defaultColumn = {
        Cell: EditableCell
    }

    return (
        <div>
            <CssBaseline />
            <Table
                defaultColumn={defaultColumn}
                columns={columns}
                data={data}
                updateData={update}
                addResource={customersService.addResource}
                title='Customer'
                skipPageReset={skipPageReset}
            />
        </div>
    )
}

export default CustomersTable
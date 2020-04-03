import React, { useState, useEffect, useMemo } from 'react'
import Table from './Table'
import CssBaseline from '@material-ui/core/CssBaseline'
import EditableCell from './EditableCell'

const CustomersTable = ({ customers, customersService, addTraining }) => {
    const [skipPageReset, setSkipPageReset] = useState(false)
    const [selectedRow, setSelectedRow] = useState(9999)
    const [editedCustomer, setEditedCustomer] = useState({})

    useEffect(() => {
        setSkipPageReset(false)
    }, [])

    const handleTrainingAdd = (row) => {
        addTraining(customers[row])
    }

    const deleteCustomer = (rowIndex) => {
        setSkipPageReset(true)
        customersService.deleteResource(customers[rowIndex])
    }

    const handleEdit = (rowIndex, columnId, value) => {
        setSkipPageReset(true)
        const customer = customers.filter((c, index) => index === rowIndex)[0]
        const updatedCustomer = { ...customer, [columnId]: value }
        setEditedCustomer(updatedCustomer)
    }

    const submitEdit = () => {
        if (editedCustomer.firstname) {
            customersService.updateResource(editedCustomer)
            setSelectedRow(9999)
            setEditedCustomer({})
        } else {
            console.log('no edits')
            setSelectedRow(9999)
            setEditedCustomer({})
        }
    }

    const cancelEdit = () => {
        setSelectedRow(9999)
        setEditedCustomer({})
    }

    const selectRow = (rowIndex) => {
        setSelectedRow(rowIndex)
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
                updateData={handleEdit}
                addResource={customersService.addResource}
                title='Customer'
                skipPageReset={skipPageReset}
                selectedRow={selectedRow}
                selectRow={selectRow}
                submitEdit={submitEdit}
                cancelEdit={cancelEdit}
                deleteRow={deleteCustomer}
                addTraining={handleTrainingAdd}
            />
        </div>
    )
}

export default CustomersTable
import React, { useState } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const initialCustomer = {
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
}

const AddDialog = ({ title, addResource }) => {
    const [customer, setCustomer] = useState(initialCustomer)
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setCustomer(initialCustomer)
    }

    const handleFieldChange = fieldName => ({ target: { value } }) => {
        setCustomer({ ...customer, [fieldName]: value })
    }

    const addCustomer = () => {
        if(checkCustomer()){
            addResource(customer)
            handleClose()
        } else {
            setError(true)
        }
    }

    const checkCustomer = () => {
        const length =
            customer.firstname.trim().length +
            customer.lastname.trim().length +
            customer.streetaddress.trim().length +
            customer.postcode.trim().length +
            customer.city.trim().length +
            customer.email.trim().length +
            customer.phone.trim().length
        return length !== 0
    }

    const clearError = () => {
        setError(false)
    }

    return (
        <>
            <Tooltip title='Add'>
                <IconButton onClick={handleOpen} color='primary'>
                    <AddCircleIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={error} onClose={clearError}>
                <DialogTitle>ERROR</DialogTitle>
                <DialogContent>
                    <DialogContentText>Add atleast 1 character to a field!</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={clearError} variant='contained' color='primary'>OK</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add {title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Use this form to add new {title}s
                    </DialogContentText>
                    <TextField 
                        autoFocus
                        margin='dense'
                        label='First Name'
                        type='text'
                        fullWidth
                        value={customer.firstname}
                        onChange={handleFieldChange('firstname')}
                    />
                    <TextField
                        margin='dense'
                        label='Last Name'
                        type='text'
                        fullWidth
                        value={customer.lastname}
                        onChange={handleFieldChange('lastname')}
                    />
                    <TextField
                        margin='dense'
                        label='Street Address'
                        type='text'
                        fullWidth
                        value={customer.streetaddress}
                        onChange={handleFieldChange('streetaddress')}
                    />
                    <TextField
                        margin='dense'
                        label='Postcode'
                        type='text'
                        fullWidth
                        value={customer.postcode}
                        onChange={handleFieldChange('postcode')}
                    />
                    <TextField
                        margin='dense'
                        label='City'
                        type='text'
                        fullWidth
                        value={customer.city}
                        onChange={handleFieldChange('city')}
                    />
                    <TextField
                        margin='dense'
                        label='Email Address'
                        type='email'
                        fullWidth
                        value={customer.email}
                        onChange={handleFieldChange('email')}
                    />
                    <TextField
                        margin='dense'
                        label='Phone Number'
                        type='text'
                        fullWidth
                        value={customer.phone}
                        onChange={handleFieldChange('phone')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='contained' color='secondary'>Cancel</Button>
                    <Button onClick={addCustomer} variant='contained' color='primary'>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddDialog
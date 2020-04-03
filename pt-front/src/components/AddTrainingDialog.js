import React, { useState } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const initialTraining = {
    date: '',
    activity: '',
    duration: 0
}

const AddTrainingDialog = ({ row, add }) => {
    const [open, setOpen] = useState(false)
    const [training, setTraining] = useState(initialTraining)
    const [error, setError] = useState(false)
    const [errorText, setErrorText] = useState('')

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setTraining(initialTraining)
    }

    const handleFieldChange = fieldName => ({ target: { value } }) => {
        setTraining({ ...training, [fieldName]: value })
    }

    const addTraining = () => {
        if(checkValues()){
            add(row.index, {...training, date: new Date(training.date).toISOString()})
            handleClose()
        } else {
            setError(true)
        }
    }

    const checkValues = () => {
        try {
            new Date(training.date).toISOString()
        } catch (error) {
            setErrorText('Error formatting date')
            return false
        }
        if(training.activity.trim().length === 0) {
            setErrorText('Activity field can not be empty')
            return false
        }
        if(training.duration === 0) {
            setErrorText('Duration can not be 0 minutes')
            return false
        }    
        return true
    }

    const clearError = () => {
        setErrorText('')
        setError(false)
    }

    return(
        <>
            <Tooltip title='Add Training'>
                <Button onClick={handleOpen}>Add Training</Button>
            </Tooltip>
            <Dialog open={error} onClose={clearError}>
                <DialogTitle>ERROR</DialogTitle>
                <DialogContent>
                    <DialogContentText>{errorText}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={clearError} variant='contained' color='primary'>OK</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Add a training for {row.cells[0].value} {row.cells[1].value}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        label='Date'
                        type='date'
                        fullWidth
                        value={training.date}
                        onChange={handleFieldChange('date')}
                    />
                    <TextField 
                        margin='dense'
                        label='Activity'
                        type='text'
                        fullWidth
                        value={training.activity}
                        onChange={handleFieldChange('activity')}
                    />
                    <TextField
                        margin='dense'
                        label='Duration in minutes'
                        type='number'
                        fullWidth
                        value={training.duration}
                        onChange={handleFieldChange('duration')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='contained' color='secondary'>Cancel</Button>
                    <Button onClick={addTraining} variant='contained' color='primary'>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddTrainingDialog
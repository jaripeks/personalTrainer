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

const initialTraining = {
    date: '',
    activity: '',
    duration: 0
}

const AddTrainingDialog = (addTraining) => {
    const [open, setOpen] = useState(false)
    const [taining, setTraining] = useState(initialTraining)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setTraining(initialTraining)
    }

    const handleFieldChange = fieldName => ({ target: { value } }) => {
        setCustomer({ ...training, [fieldName]: value })
    }

    return(
        <Dialog>

        </Dialog>
    )
}

export default AddTrainingDialog
import React, { useState } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

const DeleteDialog = ({ title, content, handleDelete }) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    
    const confirm = () => {
        handleClose()
        handleDelete()
    }

    const getContent = () => {
        if(title === 'Training') {
            return(
                <DialogContent>
                    <DialogContentText>{content[0].value}</DialogContentText>
                    <DialogContentText>{content[1].value} min</DialogContentText>
                    <DialogContentText>{content[2].value}</DialogContentText>
                    <DialogContentText>From {content[3].value.firstname} {content[3].value.lastname}</DialogContentText>
                </DialogContent>
            )
        }
        if(title === 'Customer') {
            return(
                <DialogContent>
                    {content.map(c => <DialogContentText key={c.column.id}>{c.value}</DialogContentText>)}
                </DialogContent>
            )
        }
    }

    return (
        <>
            <Tooltip title='Delete'>
                <IconButton onClick={handleOpen} color='primary'>
                    <DeleteForeverIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete {title}</DialogTitle>
                {getContent()}
                <DialogActions>
                    <Button onClick={handleClose} variant='contained' color='secondary'>Cancel</Button>
                    <Button onClick={confirm} variant='contained' color='primary'>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteDialog
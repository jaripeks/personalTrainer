import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const TabPanel = ({ children, value, index, ...other }) => {
    return (
        <Typography
            component='div'
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    )
}

export default TabPanel
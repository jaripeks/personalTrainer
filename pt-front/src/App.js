import React, { useState } from 'react';
import './App.css';
import useResource from './hooks/index'
import TrainingsTable from './components/TrainingsTable'
import CustomersTable from './components/CustomersTable'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
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

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const App = () => {
  const [trainings, trainingsService] = useResource('https://customerrest.herokuapp.com/api/trainings')
  const [customers, customersService] = useResource('https://customerrest.herokuapp.com/api/customers')
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <div>
      <AppBar position='static'>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label='Customers' {...a11yProps(0)} />
          <Tab label='Trainings' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <CustomersTable customers={customers} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <TrainingsTable trainings={trainings} />
      </TabPanel>
    </div>
  )
}

export default App;
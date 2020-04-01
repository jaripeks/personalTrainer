import React, { useState, useEffect } from 'react';
import './App.css';
import { useResource } from './hooks'
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
  const [trainings, setTrainings] = useState([])
  const [customers, customersService] = useResource('https://customerrest.herokuapp.com/api/customers')
  const [tabValue, setTabValue] = useState(0)
  const [selectedRow, setSelectedRow] = useState(9999)
  const [editedCustomer, setEditedCustomer] = useState({})

  useEffect(() => {
    getTrainingsTable()
  }, [])

  const getTrainingsTable = async () => {
    const response = await fetch('https://customerrest.herokuapp.com/gettrainings')
    const data = await response.json()
    setTrainings(data)
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleEdit = (rowIndex, columnId, value) => {
    const customer = customers.content.filter((c, index) => index === rowIndex)[0]
    const updatedCustomer = { ...customer, [columnId]: value }
    setEditedCustomer(updatedCustomer)
  }

  const submitEdit = () => {
    if(editedCustomer.firstname){
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

  return (
    <div>
      <button onClick={() => console.log(editedCustomer.links)}>test</button>
      <AppBar position='static'>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label='Customers' {...a11yProps(0)} />
          <Tab label='Trainings' {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TabPanel value={tabValue} index={0}>
        {
          customers.content ?
            <CustomersTable
              customers={customers.content}
              customersService={customersService}
              updateCustomer={handleEdit}
              selectedRow={selectedRow}
              selectRow={selectRow}
              submitEdit={submitEdit}
              cancelEdit={cancelEdit}
            />
            :
            <div>...loading</div>
        }
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {
          trainings ?
            <TrainingsTable trainings={trainings} />
            :
            <div>...loading</div>
        }
      </TabPanel>

    </div>
  )
}

export default App;
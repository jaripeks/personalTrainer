import React, { useState, useEffect } from 'react';
import './App.css';
import { useResource } from './hooks'
import TrainingsTable from './components/TrainingsTable'
import CustomersTable from './components/CustomersTable'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from './components/TabPanel'
import Calendar from './components/Calendar'
import Typography from '@material-ui/core/Typography'

const App = () => {
  const [trainings, setTrainings] = useState([])
  const [customers, customersService] = useResource('https://customerrest.herokuapp.com/api/customers')
  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    getTrainingsTable()
  }, [])

  const getTrainingsTable = async () => {
    const response = await fetch('https://customerrest.herokuapp.com/gettrainings')
    const data = await response.json()
    setTrainings(data)
  }

  const deleteTraining = async (rowIndex) => {
    const baseURL = 'https://customerrest.herokuapp.com/api/trainings'
    try {
      await fetch(`${baseURL}/${trainings[rowIndex].id}`, {
        method: 'DELETE'
      })
      getTrainingsTable()
    } catch (error) {
      console.log(error)
    }
  }

  const addTraining = async (object) => {
    const baseURL = 'https://customerrest.herokuapp.com/api/trainings'
    const customerURL = object.customer.links.filter(link => link.rel === 'self')[0].href
    const newTraining = { ...object, customer: customerURL }
    try {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTraining)
      })
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      getTrainingsTable()
    } catch (error) {
      console.log(error)
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <div>
      <AppBar position='static'>
        <Typography align='center' variant='h4' >Personal trainer</Typography>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label='Customers' />
          <Tab label='Trainings' />
          <Tab label='Calendar' />
        </Tabs>
      </AppBar>

      <TabPanel value={tabValue} index={0}>
        {
          customers.content ?
            <CustomersTable
              customers={customers.content}
              customersService={customersService}
              addTraining={addTraining}
            />
            :
            <div>...loading</div>
        }
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {
          trainings ?
            <TrainingsTable
              trainings={trainings}
              deleteTraining={deleteTraining}
            />
            :
            <div>...loading</div>
        }
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Calendar trainings={trainings} />
      </TabPanel>

    </div>
  )
}

export default App;
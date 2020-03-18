import React from 'react';
import './App.css';
import useResource from './hooks/index'
import TrainingsTable from './components/TrainingsTable'
import CustomersTable from './components/CustomersTable'

const App = () => {
  const [trainings, trainingsService] = useResource('https://customerrest.herokuapp.com/api/trainings')
  const [customers, customersService] = useResource('https://customerrest.herokuapp.com/api/customers')

  return (
    <div>
      <CustomersTable customers={customers} />
      <TrainingsTable trainings={trainings} />
    </div>
  )
}

export default App;
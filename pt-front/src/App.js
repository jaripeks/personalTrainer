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
      <button onClick={() => console.log(customers)}>klik</button>
      <TrainingsTable trainings={trainings} />
      <CustomersTable customers={customers} />
    </div>
  )
}

export default App;
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

/*const Show = ({filter, handleDelete}) => {
  //console.log(props)
  return(
    <div>
      {filter.map(person => <div key={person.id}> Name: {person.name} Number: {person.number}  Id: {person.id} <button onClick={handleDelete}>Delete</button></div> )}
    </div>
  )
}*/

const AddNotification = ({message}) => {
  if(message === null){
    return null
  }

  return(
    <div className='added'>
      {message}
    </div>
  )
}

const RemoveNotification = ({message}) => {
  if(message === null){
    return null
  }

  return(
    <div className='remove'>
      {message}
    </div>
  )
}

const Show = ({name, handleDelete, id, number}) => {
  //console.log(props)
  return(
    <li>
     Name: {name} Number: {number} Id: {id} <button onClick={handleDelete}>Delete</button>
    </li>
  )
}

const SubmitPerson = ({onSubmit, name, number, handleName, handleNumber}) => {
  //console.log(name + handleNumberChange)
  return(
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name: <input 
          value={name.newName}
          onChange={handleName}/>
        </div>
        <div>
          number: <input
          value={number.newNumber}
          onChange={handleNumber}>
          </input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const FilterPerson = ({onChange, value}) => {
  return(
    <div>
      search: <input 
        value={value.newFilter}
        onChange={onChange}>
        </input>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] =useState('')
  const [newFilter, setNewFilter] = useState('')
  const [addNumber, setAddNumber] = useState(null)
  const [removeNumber, setRemoveNumber] = useState(null)
  let filtered = ''

  /*const hook =() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }*/
  

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    //console.log("button clicked" + event.target)
    const personObject = {
      name: newName,
      number: newNumber,
    }

    //updateNewNumber()

    if(newName.length !== 0 && newNumber.length !== 0){
      if(persons.map(person => person.name).includes(newName)){
        window.alert(newName + "Already exists")
      }else{
        //setNewName('')
        //setNewNumber('')
        personService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setAddNumber('Added ' + newName)
            setTimeout(() => {
              setAddNumber(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
        //window.alert(newName + "Already exists")
      }
    }
    //setNewName('')
    //setNewNumber('')
  }

  const handlePersonRemove = (id) => {
    const person = persons.find(person => person.id === id)
    //console.log(persons.find(person => person.id))
    //console.log(persons.find(person => person.id))
    //console.log(persons.find(person => person.id === id))
    
    console.log(person)

    if(window.confirm("Do you want to delete the entry?")){
      personService
    .remove(id, person)
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    setRemoveNumber('Removed ' + person.name)
    setTimeout(() => {
      setRemoveNumber(null)
    }, 5000)
    }
  }

  const updateNewNumber = (id) => {
    const person = persons.find(person => person.name === id)
    personService
      .update(id, person)
  } 

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  filtered = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  if(filtered.length === 0){
    filtered = persons
  }

  //<Show filter={filtered} handleDelete={handlePersonRemove} />

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
      <AddNotification message={addNumber} /> 
      <RemoveNotification message={removeNumber} />
      </div>  
      <div>
        <SubmitPerson onSubmit={addPerson} handleName={handleNameChange} handleNumber={handleNumberChange} name={newName} number={newNumber}/>
      </div>
      <div>
        <FilterPerson value={newFilter} onChange={handleFilterChange}/>
      </div>
      <h2>Numbers</h2>
      <div>
        <ul>
          {filtered.map(person => <Show key={person.id} name={person.name} number={person.number} id={person.id} handleDelete={() => handlePersonRemove(person.id)}/>)}
        </ul>
      </div>
    </div>
  )

}

export default App
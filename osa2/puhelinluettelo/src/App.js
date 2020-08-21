import React, { useState } from 'react'

const FilterInput = ({updateFilter}) => {
  return <div>
    filter shown with <input onChange={updateFilter} />
  </div>
}
const AddPersonForm = ({addPerson, updateName, updateNumber}) => {
  return <form onSubmit={addPerson}>
    <div>
      name: <input onChange={updateName}/>
    </div>
    <div>
      number: <input onChange={updateNumber}/>
    </div>
    <div>
      <button type="submit" >add</button>
    </div>
  </form>
}

const PhoneNumbers = ({filter, persons}) => {
  const parsedPersons = persons
    .filter( (person) => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person => <div key={person.name}>{person.name} {person.number}</div>)
  return <>
    <h2>Numbers</h2>
    { parsedPersons }
  </>
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const updateName = (event) => {
    setNewName(event.target.value)
  }

  const updateNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const updateFilter = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(elem => elem.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons([{name: newName, number: newNumber}, ...persons])   
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterInput updateFilter={updateFilter} />
      <h1>Add a new</h1>
      <AddPersonForm updateNumber={updateNumber} updateName={updateName} addPerson={addPerson}/>
      <PhoneNumbers filter={filter} persons={persons}/>
      
    </div>
  )
}

export default App

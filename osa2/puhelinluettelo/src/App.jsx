import { useEffect, useState } from 'react'
import { createPerson, getPersons, deletePerson } from './database'

const Filter = ({onChange}) => (
 <div>filter shown with <input onChange={onChange}/></div>
)

const PersonForm = ({ onSubmit, onNameChange, onNumberChange}) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input onChange={onNameChange}/>
      number: <input onChange={onNumberChange}/>
      <button type="submit">add</button>
    </div>
  </form>
)
const Persons = ({personsToShow, handleDelete}) => (
  personsToShow.map(person => (
    <div key={person.name}>{person.name} {person.number} <button onClick={ () => handleDelete(person) } title="Delete">Delete</button></div>
  ))
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    getPersons().then(fetchedPersons => setPersons(fetchedPersons))
  }, [])


  const submit = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} already added to phonebook`)
      return
    }
    const personObject = {name: newName, number: newNumber}
    // console.log(persons)
    // console.log(event.target)
    setPersons(persons.concat(personObject))
    createPerson(personObject)

    setNewName('')
    // console.log(persons)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const handleDelete = (person) => {
    window.confirm(`Delete ${person.name}?`)
    deletePerson(person.id)
    setPersons(persons.filter(p => p.id !== person.id))
  }
  const personsToShow = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange}/>
      <h4>Add a new</h4>
      <PersonForm onSubmit={submit} onNameChange={handleNameChange} onNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
      {/* <div>debug: {newName}</div> */}
    </div>
  )

}

export default App

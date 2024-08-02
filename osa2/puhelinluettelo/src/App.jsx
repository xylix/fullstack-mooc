import { useState } from 'react'

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
const Persons = ({personsToShow}) => (
  personsToShow.map(person => (
    <div key={person.name}>{person.name} {person.number}</div>
  ))
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const submit = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} already added to phonebook`)
      return
    }
    // console.log(persons)
    // console.log(event.target)
    setPersons(persons.concat({name: newName, number: newNumber}))
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
  const personsToShow = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange}/>
      <h4>Add a new</h4>
      <PersonForm onSubmit={submit} onNameChange={handleNameChange} onNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
      {/* <div>debug: {newName}</div> */}
    </div>
  )

}

export default App

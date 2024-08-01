import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submit}>
        <div>
          name: <input onChange={handleNameChange}/>
          number: <input onChange={handleNumberChange}/>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => (
            <div key={person.name}>{person.name} {person.number}</div>
        ))}
      {/* <div>debug: {newName}</div> */}
    </div>
  )

}

export default App

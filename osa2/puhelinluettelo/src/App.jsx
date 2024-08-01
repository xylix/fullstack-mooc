import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const submit = (event) => {
    event.preventDefault()
    // console.log(persons)
    // console.log(event.target)
    setPersons(persons.concat({name: newName}))
    setNewName('')
    // console.log(persons)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submit}>
        <div>
          name: <input onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => (
            <div key={person.name}>{person.name}</div>
        ))}
    </div>
  )

}

export default App

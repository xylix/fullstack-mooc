import { useEffect, useState } from 'react'
import './style.css'
import { createPerson, getPersons, deletePerson, updatePerson } from './database'

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

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notif">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    getPersons().then(fetchedPersons => {
      setPersons(fetchedPersons)
    })
  }, [])


  const submit = (event) => {
    event.preventDefault()
    const oldPerson = persons.find(p => p.name === newName)
    if (oldPerson && oldPerson.name) {
      if (window.confirm(`Update phone number for ${oldPerson.name}?`)) {
        // FIXME: if you add a person and then without refreshing try to update them the UI is in a state where it doesn't work
        oldPerson['number'] = newNumber
        updatePerson(oldPerson).catch(e => console.log(`Could not update person due to ${e}`))
        setNotificationMessage(`Updated number of ${oldPerson.name} to ${newNumber}`)
        setTimeout(() => setNotificationMessage(null), 3000)
        // setNewName()
        // setNewNumber('')
        return
      } else {
        return
      }
    }
    if (!newName) return
    const personObject = {name: newName, number: newNumber}
    // console.log(persons)
    // console.log(event.target)
    setPersons(persons.concat(personObject))
    createPerson(personObject).then(() => {
      setNotificationMessage(`Created new person ${personObject.name}`)
      setTimeout(() => setNotificationMessage(null), 3000)
    })

    // setNewName('')
    // setNewNumber('')
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
    event.preventDefault()
    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson(person.id).then(() => {
        console.log("setting delete notif message")
        setNotificationMessage(`Deleted ${person.name}`)
        setTimeout(() => setNotificationMessage(null), 3000)
      }).catch(() => {
        setErrorMessage(`Information of ${person.name} has been removed from the server`)
        setTimeout(() => setErrorMessage(null), 3000)
      })
      setPersons(persons.filter(p => p.id !== person.id))
    }
  }
  const personsToShow = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Error message={errorMessage}/>
      <Notification message={notificationMessage} />
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

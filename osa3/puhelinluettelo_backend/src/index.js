import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { createPerson, getPersons } from './mongo_connection.js'

const app = express()
const logger = morgan(':method :post_data')
morgan.token('post_data', function (req, res) { return JSON.stringify(req.body) })
app.use(logger)
app.use(cors())
app.use(express.json())



app.get('/api/persons', (request, response) => {
  getPersons().then(persons => response.send(persons))
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(value => value.id == id)
  if (!person) {
    response.sendStatus(404)
    return
  }
  response.send(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(value => value.id == id)
  persons = persons.filter(p => p.id !== person.id)
  response.sendStatus(200)
})

app.put('/api/persons/:id', (request, response) => {
  const id = request.params.id
  console.log(id)
  const name = request.body["name"]
  const number = request.body["number"]
  const existing = persons.find(p => p.id === id)
  if (!existing) {
    console.error(`Attempted to update ${JSON.stringify(id)}`)

    console.debug(existing)
    response.status(400).send("Person must exist to update")
    console.debug(`Existing persons: ${JSON.stringify(persons)}`)
    return
  }
  const personIndex = persons.findIndex(value => value.id == id)
  const person = persons[personIndex]
  person.name = name
  person.number = number
  persons[personIndex] = person

  response.sendStatus(200)
})

app.post('/api/persons/', (request, response) => {
  const name = request.body["name"]
  const number = request.body["number"]
  if (name === undefined || number === undefined) {
    response.status(400).send("Must have both name and number")
    return
  }
  getPersons().then((persons) => {
    if (persons.find(p => p.name === name)) {
      response.status(409).send("Name already exists")
      return
    }
    const id = String(Math.floor(Math.random() * 10000000000))
    const person = { id: id, name: name, number: number }
    createPerson(person)
    console.log(person)
    response.send()
  })
})

app.get('/api/info', (request, response) => {
  const datetime = new Date()
  const content = `Phonebook has info for ${persons.length} people. \n ${datetime.toString()}`
  response.send(content)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

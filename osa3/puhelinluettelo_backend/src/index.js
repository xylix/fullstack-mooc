const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const logger = morgan(':method :post_data')
morgan.token('post_data', function (req, res) { return JSON.stringify(req.body) })
app.use(logger)
app.use(cors())
app.use(express.json())

let persons = [{
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
  }, {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
  }, {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345"
  }, {
    id: "4",
    name: "Mary Poppendieck",
    number:"39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.send(persons)
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
  if (persons.find(p => p.name === name)) {
    response.status(409).send("Name already exists")
    return
  }
  const id = String(Math.floor(Math.random() * 10000000000))
  const person = { id: id, name: name, number: number }
  persons.push(person)
  console.log(person)
  response.send()
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

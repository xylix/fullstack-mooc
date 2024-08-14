const express = require('express')
const morgan = require('morgan')

const app = express()
const logger = morgan('combined')
app.use(logger)

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

app.post('/api/persons/', (request, response) => {
  const name = request.query.name
  const number = request.query.name
  if (!name || !number) {
    response.status(400).send("Must have both name and number")
    return
  }
  if (persons.find(p => p.name === name)) {
    response.status(409).send("Name already exists")
    return
  }
  const id = Math.floor(Math.random() * 10000000000)
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

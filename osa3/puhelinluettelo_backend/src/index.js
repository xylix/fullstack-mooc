import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { createPerson, getPersons, deletePerson, updatePerson } from './mongo_connection.js'

const app = express()
const logger = morgan(':method :post_data')
morgan.token('post_data', function (req, res) { return JSON.stringify(req.body) })
app.use(logger)
app.use(cors())
app.use(express.json())



app.get('/api/persons', (request, response, next) => {
  getPersons().then(persons => response.send(persons))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const person = persons.find(value => value.id == id)
  if (!person) {
    response.sendStatus(404)
    return
  }
  response.send(person)
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  deletePerson(id)
    .then(() => response.sendStatus(200))
    .catch((err) => next(err))
  /* const person = persons.find(value => value.id == id)
  persons = persons.filter(p => p.id !== person.id)
  response.sendStatus(200) */
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  console.log(id)
  const name = request.body["name"]
  const number = request.body["number"]

  const person = {
    name: name,
    number: number,
    _id: id
  }
  console.log(person)
  updatePerson(person).then(() => {
    response.sendStatus(200)
  }).catch(err => next(err))
})

app.post('/api/persons/', (request, response, next) => {
  const name = request.body["name"]
  const number = request.body["number"]

  getPersons().then((persons) => {
    if (persons.find(p => p.name === name)) {
      response.status(409).send("Name already exists")
      return
    }
    const id = String(Math.floor(Math.random() * 10000000000))
    const person = { id: id, name: name, number: number }
    createPerson(person).then(() => {
      console.log(person)
      response.send()
    }).catch(err => next(err))
  })
})

app.get('/api/info', (request, response, next) => {
  const datetime = new Date()
  const content = `Phonebook has info for ${persons.length} people. \n ${datetime.toString()}`
  response.send(content)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



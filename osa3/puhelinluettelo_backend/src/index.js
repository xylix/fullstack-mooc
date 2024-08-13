const express = require('express')
const app = express()
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


app.get('/api/info', (request, response) => {
  const datetime = new Date()
  const content = `Phonebook has info for ${persons.length} people. \n ${datetime.toString()}`
  response.send(content)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

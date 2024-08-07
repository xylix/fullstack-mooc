import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const createPerson = (personObject) => {
  const request = axios.post(baseUrl, personObject)
  return request.then(response => {
    console.log(response)
  })
}

const getPersons = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    console.log('promise fulfilled')
    return response.data
  })
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => console.log('deleted'))
}

export {createPerson, getPersons, deletePerson}

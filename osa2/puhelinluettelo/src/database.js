import axios from 'axios'

const createPerson = (personObject) => {
  axios
      .post('http://localhost:3001/persons', personObject)
        .then(response => {
          console.log(response)
      })
}

export {createPerson}

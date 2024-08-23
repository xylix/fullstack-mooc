import * as mongoose from 'mongoose'
import 'dotenv/config'

const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function(v) {
        return /(\d{3}|\d{2})-\d{5,}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
})
const Contact = mongoose.model('Contact', contactSchema)
mongoose.connect(url)

export const getPersons = () => {
  return Contact.find({}).then(result => {
    console.log(`fetched persons ${result} from mongodb`)
    // mongoose.connection.close()
    return result
  })
}

export const getPerson = (id) => {
  return Contact.find({_id: id}).then(result => {
    console.log(`fetched person ${result} from mongodb`)
    return result
  })
}

export const createPerson = (person) => {
  const contact = new Contact(person)
  return contact.save().then(() => {
    console.log(`saved ${JSON.stringify(person)} to the db`)
  })
}

export const updatePerson = (person) => {
  console.log(person)
  return Contact.findByIdAndUpdate(
    {_id: person._id},
    { name: person.name, number: person.number},
    { new: true, runValidators: true, context: 'query' }
  ).then(() => {
    console.log(`updated person ${person._id} in the db`)
  })
}

export const deletePerson = (id) => {
  return Contact.deleteOne({_id: id}).then(() => {
    console.log(`deleted person ${id} from the db`)
  })
}

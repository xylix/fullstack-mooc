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
    required: true
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

export const createPerson = (person) => {
  const contact = new Contact(person)
  return contact.save().then(() => {
    console.log(`saved ${JSON.stringify(person)} to the db`)
  })
}

export const deletePerson = (id) => {
  return Contact.deleteOne({_id: id}).then(() => {
    console.log(`deleted person ${id} from the db`)
  })
}

import * as mongoose from 'mongoose'
import 'dotenv/config'

const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Contact = mongoose.model('Contact', contactSchema)
mongoose.connect(url)

export const getPersons = () => {
  return Contact.find({}).then(result => {
    // mongoose.connection.close()
    return result
  })
}

export const createPerson = (person) => {
  const contact = new Contact(person)
  return contact.save().then(() => {
    console.log(`saved ${person} to the db`)
  })
}

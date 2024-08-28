const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Note = require('../models/blog')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  }, {
    content: 'Browser can execute only JavaScript',
    important: true,
  }
]

beforeEach(async () => {
  await Note.deleteMany({})
  let noteObject = new Note(initialNotes[0])
  await noteObject.save()
  noteObject = new Note(initialNotes[1])
  await noteObject.save()
})

test('correct amount of blogs is returned', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect(response => {
      if (response.body.length !== 2) {
        throw new Error('incorrect amount of blogs')
      }
    })
})

test('blog id is named `id`', async () => {
  await api
    .get('/api/blogs')
    .expect(response => {
      if (!response.body[0].id) {
        throw new Error(`id is not named 'id', response had fields ${Object.keys(response.body[0])}`)
      }
    })
})

test('POST adds a new blog`', async () => {
  const original = await api.get('/api/blogs')
  await api.post('/api/blogs')
  const updated = await api.get('/api/blogs')
  if (original.body.length + 1 !== updated.body.length) {
    throw new Error('POST did not add a new blog')
  }
})

test('if likes is not given, it is set to 0', async () => {
  const blog = {
    title: 'test',
  }
  await api
    .post('/api/blogs', blog)
    .expect(201)
    .expect(response => {
      console.log(response.body)
      if (response.body.likes !== 0) {
        throw new Error('likes is not set to 0')
      }
    })
})

after(async () => {
  await mongoose.connection.close()
})

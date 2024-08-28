const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('correct amount of blogs is returned', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect(response => {
      if (response.body.length !== 3) {
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

after(async () => {
  await mongoose.connection.close()
})

const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

const initialBlogs = helper.initialBlogs

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
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
  const blog = {
    author: 'Testy Testperson',
    title: 'test',
    url: 'http://test.com',
  }
  const original = await api.get('/api/blogs')
  await api
    .post('/api/blogs').send(blog)
    .expect(201)
  const updated = await api.get('/api/blogs')
  if (original.body.length + 1 !== updated.body.length) {
    throw new Error('POST did not add a new blog')
  }
})

test('if likes is not given, it is set to 0', async () => {
  const blog = {
    author: 'Testy Testperson',
    title: 'test',
    url: 'http://test.com'
  }
  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect(response => {
      console.log(response.body)
      if (response.body.likes !== 0) {
        throw new Error('likes is not set to 0')
      }
    })
})

test('if title or url is missing, return 400', async () => {
  const blog = {
    author: "Testy Testperson",
    likes: 0,
  }
  await api
    .post('/api/blogs', blog)
    .expect(400)
})

test('delete removes a blog', async () => {
  const original = await api.get('/api/blogs')
  await api
    .delete(`/api/blogs/${original.body[0].id}`)
    .expect(204)
  const updated = await api.get('/api/blogs')
  if (original.body.length - 1 !== updated.body.length) {
    throw new Error('DELETE did not remove a blog')
  }
})

test('put updates a blog', async () => {
  const original = await api.get('/api/blogs')
  const blog = original.body[0]
  blog.likes = blog.likes + 1
  await api
    .put(`/api/blogs/${blog.id}`)
    .send(blog)
    .expect(200)
  await api
    .get(`/api/blogs/${blog.id}`)
    .expect(200)
    .expect(response => {
      if (response.body.likes !== blog.likes) {
        throw new Error('PUT did not update a blog')
      }
    })
})


after(async () => {
  await mongoose.connection.close()
})

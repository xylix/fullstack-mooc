const User = require('../models/user')

const initialBlogs = [
  {
    author: "Testy Testperson",
    title: "Test blog 1",
    url: "http://test.com",
    likes: 0
  }, {
    author: "Testy Testperson",
    title: "Test blog 2",
    url: "http://test.com",
    likes: 0
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const login = async (username, password, api) => {
  console.log('loggin in')
  const response = await api
    .post('/api/login')
    .send({ username, password })
    .expect(200)
    .expect('Content-Type', /application\/json/)
  console.log(`returning token: ${response.body.token}`)
  return response.body.token

}

module.exports = {
  initialBlogs,
  // nonExistingId,
  // blogsInDb,
  usersInDb,
  login,
}

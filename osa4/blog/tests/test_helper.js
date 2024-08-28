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

module.exports = {
  initialBlogs,
  // nonExistingId,
  // blogsInDb,
  usersInDb,
}

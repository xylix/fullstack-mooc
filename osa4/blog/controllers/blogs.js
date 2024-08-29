const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (!request.body.title || !request.body.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }
  const blog = new Blog(request.body)
  blog.likes = blog.likes || 0
  blog.user = user.id

  const result = await blog.save()
  console.log(result)
  user.blogs = user.blogs.concat(blog.id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.status(200).json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  console.log(`user ${user.id} is attempting to delete blog ${request.params.id} owned by ${blog.user._id}`)
  console.log(`match: ${user.id == blog.user._id}`)
  if (user.id.toString() === blog.user._id.toString()) {
    await Blog.deleteOne({ _id: request.params.id })
    console.log(`deleted blog ${request.params.id}`)
    response.status(204).end()
  } else {
    console.log('unauthorized, did not delete')
    return response.status(401).json({ error: 'unauthorized' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body
  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).end()
})

module.exports = blogsRouter

const blogsRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const { tokenExtractor, userExtractor } = require('../utils/middleware')
const blog = require('../models/blog')

  blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1})

    response.json(blogs)
  })

  blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog
      .findById(request.params.id)
      .populate('user', { username: 1, name: 1})
    if(!blog) {
      return response.status(404).end()
    }
    return response.json(blog)
  })

  blogsRouter.post('/', [tokenExtractor, userExtractor ],  async (request, response) => {
    const body = request.body
    if(!request.user.id) {
      return response.status(401).json({ error: 'token missing or invalid'})
    }

    const user = await User.findById(request.user.id)
    if(!user) {
      return response.status(500).end()
    }

    if(!body.title || !body.url) {
      return response.status(400).json({error: "Bad request"})
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user.id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    const blogWithUser = await Blog
      .findById(savedBlog.id)
      .populate('user', { username: 1, name: 1})

    response.status(200).json(blogWithUser)
  })

  blogsRouter.delete('/:id',[tokenExtractor, userExtractor ], async (request, response) => {
    const user = request.user

    const blog = await Blog.findById(request.params.id)
    if(!blog) {
      return response.status(404).end()
    }
    if (!user || blog.user.toString() !== user.id.toString()) {
      return response.status(401).json('token missing or invalid')
    }

    await Blog.findByIdAndDelete(blog.id)

    return response.status(204).end()
  })

  blogsRouter.put('/:id', async (request, response) => {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true})

    const blogWithUser = await Blog
      .findById(updatedBlog.id)
      .populate('user', { username: 1, name: 1})
      
    return response.json(blogWithUser)
  })

  module.exports = blogsRouter
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const blog = require('../models/blog')

const api = supertest(app)

//for user test
describe('user is not created if', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('root', 10)
        const user = new User({username: 'root', passwordHash })
    
        await user.save()
    })
    
    test('username or pass is missing', async () => {
        const newUser = {
            name: "kyaw"
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('username and password must be given')
    })

    test('username or pass has less than 3 characters', async () => {
        const newUser = {
            name: "ky",
            username: "ky",
            password: "kyawgyi"
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('username and password must be at least 3 characters')
    })

    test('username is already taken', async () => {
        const newUser = {
            name: "root",
            username: "root",
            password: "kyawgyi"
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(401)

        expect(result.body.error).toContain('username must be unique')
    })
})

beforeEach(async () => {
    await Blog.deleteMany({})
    const user = await User.findOne({username: 'root'})
    helper.initialBlogs[0].user = user.id
    helper.initialBlogs[1].user = user.id
    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blogObject => blogObject.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)     
}, 10000)

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the unique identifier of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined();
})

test('blog list posting is successfully done', async () => {
    const tokenObj = await api
            .post('/api/login')
            .send({username: 'root', password: 'root' })

    const token = JSON.parse(tokenObj.text).token

    const newBlog = {
        title: 'Testing adding post',
        author: 'Myself',
        url: 'www.me.te',
        like: 99999
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((r) => r.title)
    expect(titles).toContain(
        'Testing adding post'
    )
})

test('likes property will be 0 if missing', async () => {
    const tokenObj = await api
            .post('/api/login')
            .send({username: 'root', password: 'root' })

    const token = JSON.parse(tokenObj.text).token

    const newBlog = {
        title: 'Testing adding post',
        author: 'Myself',
        url: 'www.me.te',
    }
    let returnedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
    returnedBlog = JSON.parse(returnedBlog.text)

    expect(returnedBlog.likes).toBe(0)
})

test('400 bad request error was found if title and url are missing', async () => {
    const tokenObj = await api
            .post('/api/login')
            .send({username: 'root', password: 'root' })

    const token = JSON.parse(tokenObj.text).token

    const newBlog = {
        author: 'Myself',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const tokenObj = await api
            .post('/api/login')
            .send({username: 'root', password: 'root' })

        const token = JSON.parse(tokenObj.text).token

        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)
    
        const blogsAtEnd = await helper.blogsInDb()
    
        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )
    
        const titles = blogsAtEnd.map(r => r.title)
    
        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('updating of a blog', () => {
    test('succeeds updating if id is valid', async () => {
        const newBlog = {
            title: 'Testing adding post',
            author: 'Myself',
            url: 'www.me.te',
            like: 99999
        }
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        
    
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newBlog)
            .expect(200)
    
        const blogsAtEnd = await helper.blogsInDb()
    
        const titles = blogsAtEnd.map(r => r.title)
    
        expect(titles).toContain(newBlog.title)
    })
})



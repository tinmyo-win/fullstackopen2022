import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglagble from './components/Togglable'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      sortByLikes(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortByLikes = (blogs) => {
    const sortedBlogs = blogs.sort((a, b) => {
      if(a.likes > b.likes) return -1
      return 1
    })
    setBlogs(sortedBlogs)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setPassword('')
      setUsername('')
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

    } catch (exception) {
      const error = exception.response.data.error
      if(error) {
        setErrorMessage(error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const handleCreate = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create({ title, author, url })
    setBlogs(blogs.concat(returnedBlog))
    setSuccessMessage(`a new blog ${returnedBlog.title} is added`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)

  }

  const handleLikeUpdate = async (newBlog) => {
    const returnedObject = await blogService.update(newBlog)
    const updatedBlogs = blogs.map(blog => {
      if(blog.id === returnedObject.id) return returnedObject
      return blog
    })
    setBlogs(updatedBlogs)
  }

  const handleDelete = async (id) => {
    await blogService.deleteBlog(id)
    const updatedBlogs = blogs.filter(blog => blog.id !== id)
    setBlogs(updatedBlogs)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h3>Login to Blog List</h3>
        username:
        <input type="text" value={username} name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input type="password" value={password} name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit' id='login-button' >Login</button>
    </form>
  )

  const blogFormRef = useRef()

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} color="red" />
      <Notification message={successMessage} color="green" />

      {user && <div><i>{user.name} logged in</i>
        <button type='submit' onClick={handleLogout}>logout</button><br /> <br /> </div>}

      {user === null && loginForm()}
      {user !==null &&
        <div>
          <Togglagble buttonLabel="create new" ref={blogFormRef} >
            <BlogForm createBlog={handleCreate} />
          </Togglagble>

          {blogs.map(blog =>
            <Blog key={blog.id} userId={user.userId} blog={blog} handleLikeUpdate={handleLikeUpdate} handleDelete={handleDelete} />
          )}
        </div>
      }
    </div>
  )
}

export default App

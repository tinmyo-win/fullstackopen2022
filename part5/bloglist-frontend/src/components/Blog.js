import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLikeUpdate, userId, handleDelete }) => {
  const [showAll, setShowAll] = useState(false)

  const handleLike = (event) => {
    event.preventDefault()
    let updateBlog = blog
    updateBlog.likes += 1
    if(updateBlog.user) {
      updateBlog.user = updateBlog.user.id
    }

    handleLikeUpdate(updateBlog)

  }

  const deleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      handleDelete(blog.id)
    }
  }

  const isBlogCreater = () => {
    if(blog.user) {
      return userId === blog.user.id
    }
    return false

  }

  const showDetail = () => {
    return(
      <div style={blogStyle} className='blog-detail'>
        <p>{blog.title} <button onClick={() => setShowAll(false)}>hide</button></p>
        <p>{blog.url}</p>
        <p>likes:{blog.likes}<button onClick={handleLike} id='likeButton' >like</button></p>
        <p>{blog.author}</p>
        {isBlogCreater() && <button style={{ background: 'blue', color: 'white' }} onClick={deleteBlog}>remove</button>}
      </div>
    )
  }

  const blogStyle = {
    border: 'solid grey',
    borderRadius: 10,
    margin: 3,
    padding: 2
  }
  return(
    <div>
      {showAll && showDetail()}
      {!showAll &&
                <div style={blogStyle} className='blog' >
                  {blog.title} {blog.author}
                  <button onClick={() => setShowAll(true)}>view</button>
                </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.any.isRequired,
  handleLikeUpdate: PropTypes.any.isRequired,
  handleDelete: PropTypes.any.isRequired,
  userId: PropTypes.any.isRequired
}

export default Blog
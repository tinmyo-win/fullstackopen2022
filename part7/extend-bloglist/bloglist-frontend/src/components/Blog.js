import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import blogService from '../services/blogs'
import { addBlogs } from "../reducers/blogReducer";

const Blog = () => {
    const param = useParams('/blogs/:id')
    const dispatch = useDispatch()
    
    const blogs = useSelector(state => state.blogs)
    const blog = useSelector(state => state.blogs.find(blog => blog.id === param.id))
    const user = useSelector(state => state.user)

    const handleUpdate = async (newBlog) => {
        const returnedObject = await blogService.update(newBlog);
        const updatedBlogs = blogs.map((blog) => {
          if (blog.id === returnedObject.id) return returnedObject;
          return blog;
        });
        dispatch(addBlogs(updatedBlogs));
    };
    
    const handleDelete = async (id) => {
        await blogService.deleteBlog(id);
        const updatedBlogs = blogs.filter((blog) => blog.id !== id);
        dispatch(addBlogs(updatedBlogs));
    };
  
    const handleLike = (event) => {
      event.preventDefault();
      let updateBlog = {...blog};
  
      updateBlog.likes += 1;
      if (updateBlog.user) {
        updateBlog.user = updateBlog.user.id;
      }
  
      handleUpdate(updateBlog);
    };
  
    const deleteBlog = (event) => {
      event.preventDefault();
      if (window.confirm(`Remove blog ${blog.title}?`)) {
        handleDelete(blog.id);
      }
    };
  
    const isBlogCreater = () => {
      if (blog.user) {
        return user.userId === blog.user.id;
      }
      return false;
    };

    const addComment = (event) => {
      event.preventDefault()
      const comment = event.target.comment.value
      const updateBlog = {...blog, user: user.id, comments: [...blog.comments, comment]}
      handleUpdate(updateBlog)
    }

    const keyGenerator = () => {
      return (Math.random() * 100000000).toFixed(0)
    }

    if(!blog) return null

    return (
        <div className="blog-detail">
            <a href="#">{blog.url}</a>
            <p>
                likes:{blog.likes}
                <button onClick={handleLike} id="likeButton">
                  like
                </button>
            </p>
            <p> added by {blog.author}</p>
              {isBlogCreater() && (
                <button
                  style={{ background: "blue", color: "white" }}
                  onClick={deleteBlog}
                >
                  remove
                </button>
              )}
            <div>
              <i>comments</i>
              <form onSubmit={addComment}>
                <input name="comment" />
                <button>add comment</button>
              </form>
              <ul>
                {blog.comments.map(comment => <li key={keyGenerator()}>{comment}</li>)}
              </ul>
            </div>
          </div>
          );
  };

export default Blog
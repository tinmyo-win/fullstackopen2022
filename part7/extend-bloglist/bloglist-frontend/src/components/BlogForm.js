import { useRef, useState } from "react";
import PropTypes from "prop-types";
import Togglable from "./Togglable";
import { useSelector, useDispatch } from "react-redux";
import blogService from '../services/blogs'
import { addBlogs } from "../reducers/blogReducer";
import { addSuccessNotification, removeSuccessNotification } from "../reducers/notificationReducer";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const createBlog = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisibility();
    const returnedBlog = await blogService.create({ title, author, url });
    dispatch(addBlogs(blogs.concat(returnedBlog)));
    dispatch(addSuccessNotification(`a new blog ${returnedBlog.title} is added`))
    setTimeout(() => {
      dispatch(removeSuccessNotification())
    }, 5000);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const blogFormRef = useRef()

  return (
    user !== null && (
      <div>
        <Togglable buttonLabel="create new" ref={blogFormRef}>
          <h3>Create New</h3>
          <form onSubmit={addBlog}>
            <div>
              title:
              <input
                type="text"
                id="title"
                value={title}
                name="Title"
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author:
              <input
                type="text"
                id="author"
                value={author}
                name="Author"
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              url:
              <input
                type="text"
                id="url"
                value={url}
                name="Url"
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <button type="submit" id="create">
              Create
            </button>
          </form>
        </Togglable>
        
      </div>
    )
  );
};

export default BlogForm;

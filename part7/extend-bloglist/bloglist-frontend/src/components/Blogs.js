import { useState, useEffect } from "react";
import blogService from '../services/blogs'

import { useSelector, useDispatch } from "react-redux";
import { addBlogs } from "../reducers/blogReducer";
import { Link } from "react-router-dom";

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs )
  const user = useSelector(state => state.user)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(addBlogs(sortByLikes(blogs))) 

    });
  }, []);

  const sortByLikes = (blogs) => {
    const sortedBlogs = blogs.sort((a, b) => {
      if (a.likes > b.likes) return -1;
      return 1;
    });
    
    return sortedBlogs
    
  };

  const blogStyle = {
    border: "solid grey",
    borderRadius: 10,
    margin: 3,
    padding: 2,
  };

  return(
    user !== null && (
      <div>
        <h2>Blogs</h2>
        {blogs.map((blog) => (
            <div style={blogStyle} key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>
        ))}
      </div>
    )
  )
}

export default Blogs;

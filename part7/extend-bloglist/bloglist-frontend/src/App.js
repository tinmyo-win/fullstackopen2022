import { useEffect } from "react";
import Blogs from "./components/Blogs";
import Blog from  './components/Blog'
import blogService from "./services/blogs";
import usersService from './services/users'
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from './components/LoginForm'
import { addUsers } from "./reducers/usersReducer";

import { BrowserRouter as Router,
    Routes, Route, Link, Navigate } from "react-router-dom";

import { setUser, removeUser} from './reducers/userReducer'
import { useSelector, useDispatch } from "react-redux";
import Users from './components/Users'
import User from './components/User'
import blogs from "./services/blogs";
import { addBlogs } from "./reducers/blogReducer";

const App = () => {

  const errorMessage = useSelector(state => state.notification.errorNotification)
  const successMessage = useSelector(state => state.notification.successNotification)

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  usersService.getAll().then(users => dispatch(addUsers(users)) )
  blogService.getAll().then(blogs => dispatch(addBlogs(blogs)))

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      dispatch(setUser(user));

      blogService.setToken(user.token);
    }
  }, []);

  const padding = {
    padding: 10,

  }

  const handleLogout = (event) => {
    dispatch(removeUser());
    window.localStorage.removeItem("loggedBloglistUser");

  };

  return (
    <div>
      
      <Notification message={errorMessage} color="red" />
      <Notification message={successMessage} color="green" />
        <div>
          <Link style={padding} to='/'> home </Link>
          <Link style={padding} to='/users'>Users </Link>
          {user && <strong>{user.username} logged-in<button onClick={handleLogout}>logout</button></strong>}
        </div>

        <h2>Blog App</h2>
        <Routes>
          <Route path="/blogs/:id" element={user ? <Blog /> : <Navigate replace to='/login' />} />
          <Route path="/users" element={user ? <Users /> : <Navigate replace to='/login' />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/"
            element={
              user 
              ? <><BlogForm /><Blogs /></>
              : <Navigate replace to='/login' />
            }
          />
        </Routes>  
    </div>
  );
};

export default App;

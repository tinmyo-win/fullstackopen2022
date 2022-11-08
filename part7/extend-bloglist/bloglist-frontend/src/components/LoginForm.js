import React, { useState } from 'react';
import loginService from '../services/login'
import { setUser, removeUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import { useSelector, useDispatch } from 'react-redux';
import { addErrorNotificaton, removeErrorNotification } from '../reducers/notificationReducer';
import { Navigate } from 'react-router-dom';

const LoginForm = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
          const user = await loginService.login({
            username,
            password,
          });
          dispatch(setUser(user));
          setPassword("");
          setUsername("");
          window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
          blogService.setToken(user.token);
          
        } catch (exception) {
          const error = exception.response.data.error;

          if (error) {
            dispatch(addErrorNotificaton(error));
            setTimeout(() => {
              dispatch(removeErrorNotification(null));
            }, 5000);
          }
        }
    };

    return (
        <div>
                {user && <Navigate replace to='/' />}
                <form onSubmit={handleLogin}>
                    <div>
                        <h3>Login to Blog List</h3>
                        username:
                        <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password:
                        <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit" id="login-button">
                         Login 
                    </button>
                </form>      
        </div>
    )
}

export default LoginForm
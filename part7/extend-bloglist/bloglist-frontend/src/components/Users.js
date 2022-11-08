import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUsers } from '../reducers/usersReducer'
import usersService from '../services/users'
import {Link} from 'react-router-dom'

const Users = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        usersService.getAll().then(users => dispatch(addUsers(users)) )
    }, [])

    const users = useSelector(state => state.users)

    return(
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <td></td>
                        <td>created blogs</td>
                    </tr>
                    {users.map(user => 
                    <tr key={user.id}>
                        <td>
                            <Link to={`/users/${user.id}`} >{
                                user.username}
                            </Link>
                        </td>
                        <td>
                            {user.blogs.length}
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default Users
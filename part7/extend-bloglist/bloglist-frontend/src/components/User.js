import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const User = () => {
    const param = useParams('/users/:id')
    const user = useSelector(state => state.users.find(u =>  u.id === param.id))
    if(!user) return <div> User not found</div>
    return(
        <div>
            <h1>{user.username}</h1>
            <strong>added blogs</strong>
            <ul>
                {user.blogs.map(blog => 
                    <li key={blog.id}>
                        {blog.title}
                    </li>)}
            </ul>
        </div>
    )
}

export default User
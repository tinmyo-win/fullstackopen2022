import { useDispatch } from 'react-redux'
import { createAnecdote, newAnecdote } from '../reducers/anecdoteReducer'
import { createAnecdoteNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(createAnecdoteNotification(`You added '${content}'`, 10))

    }
    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote} >
                <div><input name="anecdote" /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
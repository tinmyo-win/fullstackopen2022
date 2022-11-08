import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { resetNotification, addVoteNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = [...useSelector(state => state.anecdotes)].sort((first, second) => {
        return first.votes > second.votes ? -1 : 1
      })

    const filterWords = useSelector(state => state.filter )

    const dispatch = useDispatch()
    const vote = async (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(addVoteNotification(`You voted '${anecdote.content}'`, 5))

    }
    return(
        <div>
            {anecdotes.filter(anecdote => anecdote.content.includes(filterWords)).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList
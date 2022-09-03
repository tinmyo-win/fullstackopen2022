import { useState } from 'react'

const Anecdote = ( { anecdote, point}) => {

    return(
        <div>
            <p>{anecdote}</p>
            <p>has {point} votes</p>
        </div>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ]

    const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
    const [selected, setSelected] = useState(0);

    function getRandomNum(max, min = 0) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    
    let max_vote_index = points.indexOf(Math.max(...points))

    const nextAnecdote = () => {
        let next_index = getRandomNum(anecdotes.length)
        setSelected(next_index);
    }

    const voteAnecdote = () => {
        const copy = [...points]
        copy[selected] += 1
        setPoints(copy)
    }

  return(
    <div>
        <h3>Anecdote of the Day</h3>
        <Anecdote anecdote = {anecdotes[selected]} point = {points[selected]} />
        <button onClick={voteAnecdote}>Vote</button>
        <button onClick={nextAnecdote}>Next anecdote</button>

        <h3>Anecdote with the most votes</h3>
        <Anecdote anecdote = {anecdotes[max_vote_index]} point = {points[max_vote_index]} />
    </div>
  )
}

export default App
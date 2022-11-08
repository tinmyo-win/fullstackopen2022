import { filterAnecdote } from '../reducers/filterReducer'
import { connect } from "react-redux"

const Filter = (props) => {
    const handleChange = (event) => {
        event.preventDefault()
        const filterWords = event.target.value
        props.filterAnecdote(filterWords)
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} name='filterWords' />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        filterAnecdote: value => {
            return dispatch(filterAnecdote(value))
        }
    }
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter
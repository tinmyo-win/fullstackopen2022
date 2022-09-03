const Filter = (props) => {

    function handleFilterName(event) {
        props.handleFilterName(event.target.value)
    }
    return(
        <div>
            Filter words
            <input value={props.filterName} onChange={handleFilterName} />
        </div>
    )
}

export default Filter
const Persons =( {persons, filterName, handleDeletePerson}) => {

    function handleDelete(person) {
        if(window.confirm(`Are you sure to delete ${person.name}`)) {
            handleDeletePerson(person.id)
        }
    }
    return(
        <ol>
            {persons.filter(person => person.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase())).map(person => {
                return(
                    <li key={person.name}>{person.name} : {person.number}<button onClick={()=> handleDelete(person)}>delete</button></li>
                ) 
            })}
        </ol>
    )
}

export default Persons
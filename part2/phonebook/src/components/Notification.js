const Notification =( {message, color='green'} ) => {

    const errorColor = {
        color: 'red'
    }
    const successColor = {
        color: 'green'
    }
    const added = {
        background: 'lightgrey',
        fontSize: 20,
        borderStyle : 'solid',
        borderRadius : 5,
        padding: 10,
        marginBottom: 10
    }
    if (message === null) {
        return null
    }

    return(
        color !== 'red' 
            ?<div style={{...added, ...successColor}}>{message}</div> : 
             <div style={{...added, ...errorColor}}>{message}</div>
    )
}

export default Notification
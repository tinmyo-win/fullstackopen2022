const Header = ( { name }) => {
    return(
        <h1>{name}</h1>
    )
}

const Part = ( { part } ) => {
    return(<p> {part.name} : {part.exercises} </p>)
}

const Content = ( {parts} ) => {
    return(
        <div>
            {parts.map(part => <Part key = {part.id} part = {part} />)}
        </div>
    )
}

const Total = ({parts}) => {

    let total_exerxicises = parts.map(part => part.exercises).reduce((first, second) => first + second)
    return(<p>Total of {total_exerxicises} exercises</p>)
}

const Course = (props) => {
    return(
        <div>
            {props.courses.map(course => { 
                return (<div key = {course.id}>
                    <Header name = {course.name} />
                    <Content parts = {course.parts} />
                    <Total parts = {course.parts} />
                </div>)
           })}

        </div>
    )
}

export default Course
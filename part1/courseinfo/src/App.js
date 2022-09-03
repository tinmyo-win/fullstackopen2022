
const Header = (props) => {
    console.log(props);
    return(
        <h1>{props.course}</h1>
    )
}

const Part = ( { part } ) => {
    return(<p> {part.name} : {part.exercises} </p>)
}

const Content = ( {parts} ) => {
    return(
        <div>
            {parts.map(part => <Part part = {part} />)}
        </div>
    )
}

const Total = ({total_exerxicises}) => {
    return(<p>Number of exercises: {total_exerxicises}</p>)
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }

    return(
        <div>
            <Header course = {course.name} />
            <Content parts = {course.parts} />
            <Total total_exerxicises = {course.parts.map(part=> part.exercises).reduce((previousVal, currentVal) => previousVal + currentVal) } />
        </div>
    )
}

export default App;

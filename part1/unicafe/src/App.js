import { useState } from "react";

const Statistics = ({good, neutral, bad}) => {
    if(good === 0 && neutral === 0 && bad === 0){
        return(
            <p><i>No Feedback given</i></p>
        )
    }
    return(
        <div>
            <StatisticsLine text="good" value = {good} />
            <StatisticsLine text="neutral" value = {neutral} />
            <StatisticsLine text="bad" value = {bad} />
            <p>All: {good + neutral + bad }</p>
            <p>Positive: {100*good/(good + neutral + bad)}%</p>
        </div>
    )
}

const StatisticsLine =({text, value}) => {
    return(
            <tr>
                <td><p>{text}</p></td>
                <td><p>{value}</p></td>
            </tr>
    )
}

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return(
        <div>
            <h1>Give Feedback</h1>
            <button onClick={()=>setGood(good+1)}>good</button>
            <button onClick={()=>setNeutral(neutral+1)}>neutral</button>
            <button onClick={()=>setBad(bad+1)}>bad</button>
            <h3>Statistics</h3>
            <Statistics good={good} neutral={neutral} bad={bad} />

        </div>
    )
}

export default App;
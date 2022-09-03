import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({country}) => {
    const languages = [];

    for (const key in country.languages) {
        languages.push(country.languages[key]);
    }
    return (
        <div>
            <h2>{country.name.common}</h2><br></br>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p><br />
            <p><strong>languages</strong></p>
            <ul>
                {languages.map(language => <li key={language}>{language}</li>)}
            </ul>
            <div style={{'fontSize': 200}}>{country.flag}</div>
            
        </div>
    )
}

const Countries = ( props ) => {
    let filterCountries = props.countries.filter(country => country.name.common.toLocaleLowerCase().includes(props.filterWord.toLocaleLowerCase()))
    if(props.showCountry) {
        return <Country country={props.showCountry} />
    }
    if (filterCountries.length > 10) {
        return <p>Too Many countries.More specific</p>
    } else if(filterCountries.length ===1) {
        return <Country country={filterCountries[0]} />
    }

    function handleShowCountry(country) {
        props.handleShowCountry(country);
    }

    return(
        <div>
            {filterCountries.map(country=> 
                    <div key={country.name.common}>
                        <p> {country.name.common} 
                            <button onClick={()=>handleShowCountry(country)}>Show</button> 
                        </p> 
                    </div>
            )}
        </div>
    )
}

const App = () => {
    const [showCountry, setShowCountry] = useState(null);
    const [countries, setCountries] = useState([])
    const [filterWord, setFilterWord] = useState('')

    useEffect(()=> {
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                console.log(response.data)
                setCountries(response.data)
            })
    }, [])

    function handleFilterWord(event) {
        setFilterWord(event.target.value)
        setShowCountry(null)
    }

    function handleShowCountry(country) {
        setShowCountry(country)
    }

    return(
        <div>
            <p>Search Countries</p><input value={filterWord} onChange={handleFilterWord} />
            <Countries countries={countries} filterWord={filterWord} showCountry={showCountry} handleShowCountry={handleShowCountry} />
            
        </div>
    )
}

export default App
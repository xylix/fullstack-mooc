import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css';

const FilterInput = ({updateFilter}) => {
  return <div>
    filter shown with <input onChange={updateFilter} />
  </div>
}

const Countries = ({countries, filter, setFilter}) => {
  const parsedCountries = countries 
    .filter( (country) => country.name.toLowerCase().includes(filter.toLowerCase()))

  console.debug(parsedCountries)

  if (parsedCountries.length > 10) {
    return <div>Too many matches, specify another filter </div>
  } else if (parsedCountries.length === 1) {
    const country =  parsedCountries[0]
    return <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population{country.population}</div>
      <h2>languages</h2>
      <ul>{country.languages.map(language => <li key={language.name}>{language.name}</li>)}</ul>
      <img style={{maxWidth:"500px"}} alt={`flag of ${country.name}`} src={country.flag} />
    </div>
  } else {
    return <>
      { parsedCountries
        .map(country => <div key={country.name}>
          {country.name}<button onClick={() => setFilter(country.name)}>show</button> 
        </div>) }
    </>
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const updateFilter = (event) => {
    setFilter(event.target.value)
  }
  useEffect(() => {
    console.log('effect');
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  return (
    <div className="App">
      
      <FilterInput updateFilter={updateFilter} />
      <Countries countries={countries} filter={filter} setFilter={setFilter} />
    </div>
  );
}

export default App;

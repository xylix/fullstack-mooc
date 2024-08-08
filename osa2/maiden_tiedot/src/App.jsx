import { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({onChange}) => (
 <div>Find countries <input onChange={onChange}/></div>
)

const FilteredCountries = ({filter, setFilter, countryData}) => {
  if (!countryData) return
  if (!filter) return "Too many matches specify another filter"

  let countryList = []
  Object.keys(countryData).forEach((key, index) => {
    if (key.toLowerCase().includes(filter.toLowerCase())) countryList.push(countryData[key])
  })
  if (countryList.length === 1) {

    const country = countryList[0]
    return <div>
      <h3>{country.name.common}</h3>
      capital: {country.capital[0]}
      <br />
      area: {country.area}

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} />
    </div>
  }
  return <div>
    {countryList.map(c => <p key={c.name.common}>{c.name.common}<button onClick={() => setFilter(c.name.common)}>show</button></p>)}
  </div>

}

function App() {
  const [countryData, setCountryData] = useState(null)
  const [filter, setFilter] = useState("")

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    const apiUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"
    const request = axios.get(apiUrl)
    request.then((response) => {
      const rawData = response.data
      const parsedCountryData = {}
      Object.keys(rawData).forEach((key, index) => {
        const countryName = rawData[key].name.common
        parsedCountryData[countryName] = rawData[key]
      })
      setCountryData(parsedCountryData)
      console.log(parsedCountryData)
    })
  }, [])

  return (
    <>
      <Filter onChange={handleFilterChange} />
      <FilteredCountries filter={filter} countryData={countryData} setFilter={setFilter}/>
    </>
  )
}

export default App

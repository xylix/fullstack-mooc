import { useState, useEffect } from 'react'
import axios from 'axios'

const weatherCall = (lat, long) => {
  return axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,wind_speed_10m`)
}

const Filter = ({onChange}) => (
 <div>Find countries <input onChange={onChange}/></div>
)

const FilteredCountries = ({filter, setFilter, countryData, country, setCountry, weatherData, setWeatherData}) => {
  useEffect(() => {
    if (country) {
      weatherCall(country.latlng[0], country.latlng[1]).then(w => {
        setWeatherData(w.data)
        console.log(w)
      })
    }
  }, [country])

  if (!countryData) return
  if (!filter) return "Too many matches specify another filter"

  let countryList = []
  Object.keys(countryData).forEach((key, index) => {
    if (key.toLowerCase().includes(filter.toLowerCase())) countryList.push(countryData[key])
  })
  setCountry(countryList[0])
  if (countryList.length === 1) {
    const c = countryList[0]

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
      <div>temp: {weatherData && weatherData.current.temperature_2m} °C</div>
      <br/>
      <div>wind: {weatherData && weatherData.current.wind_speed_10m} m/s</div>
    </div>
  }
  return <div>
    {countryList.map(c => <p key={c.name.common}>{c.name.common}<button onClick={() => setFilter(c.name.common)}>show</button></p>)}
  </div>

}

function App() {
  const [countryData, setCountryData] = useState(null)
  const [filter, setFilter] = useState("")
  const [country, setCountry] = useState("")
  const [weatherData, setWeatherData] = useState(null)

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
    })
  }, [])

  return (
    <>
      <Filter onChange={handleFilterChange} />
      <FilteredCountries
        filter={filter}
        countryData={countryData}
        setFilter={setFilter}
        country={country}
        setCountry={setCountry}
        weatherData={weatherData}
        setWeatherData={setWeatherData}/>
    </>
  )
}

export default App

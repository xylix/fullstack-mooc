import { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({onChange}) => (
 <div>Find countries <input onChange={onChange}/></div>
)

const FilteredCountries = ({filter, countryData}) => {
  if (!countryData) return
  if (!filter) return "Too many matches specify another filter"

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
      <FilteredCountries filter={filter} countryData={countryData}/>
    </>
  )
}

export default App

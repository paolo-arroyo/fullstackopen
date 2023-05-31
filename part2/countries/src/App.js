import axios from 'axios'
import { useState, useEffect } from 'react'

const Search = ({value, handler}) => {
  return (
  <>
    Find Countries: <input value={value} onChange={handler} />
  </>
  )
}

const Result = ({countries, handler}) => {
  if (countries.length > 10) {
    return <p>Too many matches. Please specify your search. </p>
  } else if (countries.length === 1) {
    return <Country data={countries[0]} handler={handler}/>
  } else {
    return countries.map(c => <div key={c.name.common}> {c.name.common} </div>)
  }
}

const Country = ({data}) => {
  return (
    <div>
      <h1> {data.name.common} </h1>
      <div>Capital: {data.capital}</div>
      <div>Area: {data.area}</div>
      
      <h1> Languages </h1>
      <ul>
        {Object.values(data.languages).map(l => <li key={l}>{l}</li>)}
      </ul>
      <img src={data.flags.png} alt={`Flag for ${data.name.common}`} />
    </div>
  )
}

const App = () => {
  //States & Constants
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const allUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
  const filteredCountries = search !== '' ? countries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase())) : countries

  //Effects
  const initial = () => {
    axios.get(allUrl).then(allCountries => {
      setCountries(allCountries.data)
    })
  }
  useEffect(initial,[])

  //Handlers
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  //Statements

  //Output
  return (
    <>
    <Search value={search} handler={handleSearch} />
    <Result countries={filteredCountries} />
    </>
  )
}

export default App;

import axios from 'axios'
import { useState, useEffect } from 'react'

const Search = ({value, handler}) => (<> Find Countries: <input value={value} onChange={handler} /> </>)

const Result = ({countries, setSelected, selected}) => {
  if (selected === null) {
    if (countries.length > 10) {
      return <p>Too many matches. Please specify your search. </p>
    } else if (countries.length === 1) {
      setSelected(countries[0])
    } else {
      return countries.map(c => <div key={c.name.common}> {c.name.common} <button onClick={() => setSelected(c)}>Show</button> </div>)
    }
  } else {
    return <Country selected={selected} />
  }
}

const Country = ({selected}) => {
  if (selected !== null) {
    console.log(selected)
    return (
      <div>
        <h1> {selected.name.common} </h1>
        <div>Capital: {selected.capital}</div>
        <div>Area: {selected.area}</div>
        
        <h1> Languages </h1>
        <ul>
          {Object.values(selected.languages).map(l => <li key={l}>{l}</li>)}
        </ul>
        <img src={selected.flags.png} alt={`Flag for ${selected.name.common}`} />
      </div>
    )
  } else {
    return null
  }
}

const App = () => {
  //States & Constants
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [selected, setSelected] = useState(null)
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
    setSelected(null)
  }

  //Statements

  //Output
  return (
    <>
    <Search value={search} handler={handleSearch} />
    <Result countries={filteredCountries} selected={selected} setSelected={setSelected} />
    </>
  )
}

export default App;

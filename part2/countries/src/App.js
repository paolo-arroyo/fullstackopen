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
  const [temp, setTemp] = useState('')
  const [icon, setIcon] = useState('')
  const [windSpeed, setWindSpeed] = useState('')
  const api_key = process.env.REACT_APP_API_KEY
  const weatherapi = `http://api.openweathermap.org/data/2.5/weather?id=524901&appid=${api_key}&units=metric&q=${selected.capital}`
  
  useEffect(() => {
    axios.get(weatherapi).then(response => {
      const current = response.data
      setTemp(current.main.temp)
      setWindSpeed(current.wind.speed)
      setIcon(current.weather[0].icon)
    })
  },[weatherapi])

  if (selected !== null) {
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
        <h2> Weather in {selected.capital}</h2>
        <p>Temperature: {temp} Celcius </p>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={`Weather in ${selected.capital}`} />
        <p> Wind: {windSpeed} m/s </p>
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

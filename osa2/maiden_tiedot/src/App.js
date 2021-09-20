import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState([])
  let chosenCountry;

  const fetchCountries = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(e => {
        setCountries(e.data)
      })
      .catch(e => {
        alert(e)
      })
  }

  const changeFilter = (e) => {
    setFilter(e.target.value)
  }

  useEffect(fetchCountries, [])

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes( filter.length > 0 ? filter.toLowerCase() : '' ))

  if(filteredCountries.length === 1) chosenCountry = filteredCountries[0]
  else chosenCountry = undefined

  return (
    <div className="App">
      <div>
        find countries: <input onChange={changeFilter} value={filter} />
      </div>
      <div>
        {
          filteredCountries.length < 10 ?
            filteredCountries.length === 1 || !!chosenCountry ?
            <CountryDetails name={chosenCountry.name} population={chosenCountry.population} capital={chosenCountry.capital} flag={chosenCountry.flag} languages={chosenCountry.languages} />
            : filteredCountries.map(country => <div key={country.name}>{country.name} <button onClick={() => setFilter(country.name)}>show</button></div>)
            : 'Too many countries, be more spesific'
        }
      </div>
    </div>
  );
}

const CountryDetails = ({ name, population, capital, languages, flag }) => {  
  const [weather, setWeather] = useState({})

  const fetchWeather = () => {
    console.log(process.env)
    axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${name}`)
      .then(e => {
        console.log(e.data)
        setWeather(e.data)
      })
      .catch(e => alert(e))
  }

  useEffect(fetchWeather, [])

  return(
    <div>
      <h1>{name}</h1>
      <div>population: {population}</div>
      <div>capital: {capital}</div>
      <h3>languages</h3>
      <ul>
        {
          languages.map(lang => <li key={lang.iso639_2}>{lang.name}</li>)
        }
      </ul>
        {
          !!weather.location &&
              <>
                <img width="200px" src={flag} alt={`${name}'s flag`}></img>
                <h3>Weather in {weather.location.name}</h3>
                <div><strong>temperature: </strong> {weather.current.temperature} Celsius</div> 
                <img width="100px" src={weather.current.weather_icons[0]} alt={`${weather.location.name}'s weather icon`}></img>
                <div><strong>wind: </strong> {weather.current.wind_degree} mph direction {weather.current.wind_dir}</div> 
              </>
        }
  

    </div>
  )
}

export default App;

import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Filter = ({value, onChange }) => {
  return(
    <div>
      <form >
      search: <input 
        value={value.newFilter}
        onChange={onChange}>
        </input>
      </form>
    </div>
  )
}


const Show = ({filter, handleButton}) => {
  console.log("pituus" + filter.length)
  console.log("languages" + filter.map(country => country.languages.map(country => country.name)))
  console.log("country" + filter.map(country => country.name))
  console.log("weather" + filter.map(country => country.temperature))

  const city = filter.map(country => country.name)
  console.log(city)


  if(filter.length <= 10 && filter.length !== 1){
    return(
      <div>
        <div>
        {filter.map(country => <div key={country.name}>{country.name}<button text={country.name} onClick={handleButton.bind(this, country.name)}>show</button> </div>)}
      </div>
      </div>
    )
  }

  if(filter.length === 1){
    return(
      <div>
        <div>
          {filter.map(country => <h1>{country.name}</h1>)}
        </div>
        <div>
          Capital {filter.map(country => country.capital)}
        </div>
        <div>
          Population {filter.map(country => country.population)}
        </div>
        <div>
          <h2>Languages</h2> {filter.map(country => country.languages.map(language => <li>{language.name}</li>))}
        </div>
        <div>
          <img src={filter.map(country => country.flag)} width="250"></img>
        </div>
        <div>
          <h3>Weather in {filter.map(country => country.capital)}</h3>  
        </div>
        <div>
          <p>temperature: {filter.map(country => country.temperature)}</p>  
        </div>        
      </div>
    )
  }
  return(
    <div>
      Too many matches, specify another filter
    </div>
  )
}

function App(props) {
  const [countries, setCountries] = useState([])
  const [newName, setNewName] = useState('')
  const [newCapital, setNewCapital] = useState('')
  const [newPopulation, setNewPopulation] = useState('')
  const [newLanguages, setNewLanguages] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [newFlag, setNewFlag] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newWeatherName, setNewWeatherName] = useState('')
  const [newTemperature, setNewTemperature] = useState ('')
  const [newIcon, setNewIcon] = useState ('')
  const [newWind, setNewWind] = useState ('')
  let filtered = ''
  const api_key = process.env.REACT_APP_API_KEY
  const ACCES_KEY = process.env.REACT_APP_API_KEY



  const countryObject = {
    name: newName,
    capital: newCapital,
    population: newPopulation,
    languages: newLanguages,
    flag: newFlag,
    //temperature: newTemperature,
    //weatherIcon: newIcon,
    //wind: newWind,
  }

  const weatherObject = {
    location: newLocation,
    name: newWeatherName,
    //current: newCurrent,
    weatherIcon: newIcon,
    wind: newWind,
  }

  const hook =() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }

  /*const hook =() => {
    console.log('effect')
    const params = {
      access_key: api_key,
      query: 'New York'
    }

    axios.all([axios.get('https://restcountries.eu/rest/v2/all'),
               axios.get('https://api.weatherstack.com/current', {params})])
               .then(axios.spread((firstResponse, secondResponse) => {
                 console.log(firstResponse.data, secondResponse.data)
               }))
               //.catch(error => console.log(error))

  }*/

  const weather = () => {
    console.log('weather')
    const params = {
      acces_key: ACCES_KEY,
      query: 'New York'
    }

    axios.get('https://api.weatherstack.com/current', {params})
    .then(response => {
      const apiResponse = response.data;
      console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
      console.log(apiResponse)
    }).catch(error => {
      console.log(error);
    })
  }
  //console.log(weather)

  useEffect(hook, [])
  console.log('render', countries.length, 'countries')

  useEffect(weather, [])
  //console.log('weather', newTemperature )

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const setName = (parameter) => {
    setNewFilter(parameter)
    console.log("painettu" + newName)
  }

  filtered = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
  console.log("kaupuni" + filtered.map(country => country.name))


  return (
    <div>
    <div>
      <Filter value={newFilter} onChange={handleFilterChange} />
    </div>
    <div>
      <Show filter={filtered} handleButton={setName} newFilter={handleFilterChange}/>
    </div>
    </div>
  )
}

export default App;

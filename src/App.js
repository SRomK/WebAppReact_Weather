import { useState } from 'react';
import Search from './components/search/search';
import Forecast from './components/forecast/forecast';
import CurrentWeather from './components/current-weather/current-weather';
import CreatedBy from './components/createdBy/createdby';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import './App.css';


function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" "); /* destructuracion en forma de arrays de donde salen 2 posicion, uno y dos */

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    ); /* le paso 4 parametros al fetch---> wapiurl, lat, lon y weapikey */

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch]) /* dentro del promise all siempre tendra que ir un array formado por las promesas/fetches*/
      .then(async (response) => {
        const weatherResponse = await response[0].json(); /* viene de json y lo convierte a un formato legible para js */
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse }); /*  los 3 puntos es estar guardando los valres de weather response// el spread operator hace que me quede con los valores dle objeto, no con el objeto en si*/
        console.log("con puntos", { city: searchData.label, ...weatherResponse });
        console.log("sin", { city: searchData.label, weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  console.log(forecast);

  return ( /* una vez que la promesa se resuelve se renderiza la app con todos los componentes integrados que conforman la aplicacion */
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />} { /* si se "rellene" currentweather y forecast se renderiza el componente <CurrentWea... y <Forecast */}
      {forecast && <Forecast data={forecast} />} {/* y luego en current weather hago una destructuracion del objeto prop y saco la key "data" ---> ({data}) */}
      <CreatedBy />
    </div>
  );
}

export default App;

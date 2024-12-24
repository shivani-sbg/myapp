import { useEffect, useState } from "react";
import './App.css';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null)
  const apiKey = '64f60853740a1ee3ba20d0fb595c97d5';


  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!res.ok) {
          throw new Error('City not found');
        }
        const data = await res.json();
        setWeather(data);


        setError(null)
      } catch (err) {
        setError(err.message);
        setWeather(err.message)
      }
    };

    if (city) fetchWeather(); // Only fetch if city is not empty
  }, [city]);



  function handleChange(e) {
    setCity(e.target.value)
  }

  return (<>
    <div >
      <h1>WEATHER-APP</h1>
      <input className="input" type='text' value={city} placeholder="Search City" onChange={handleChange} />


      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && weather.main && (
        <div>
          <h1>City : {weather.name}</h1>
          <h3>Temperature : {weather.main.temp}°C <h6> MinTemp : {weather.main.temp_min} MaxTemp : {weather.main.temp_max}</h6></h3>
          <h3>Weather-Description : {weather.weather[0].description}</h3>
          <h3>Humidity : {weather.main.humidity} %</h3>
          <h3>Pressure : {weather.main.pressure} hPa</h3>
          <h3> Visibility: {(weather.visibility / 1000).toFixed(1)} km</h3>
          <h3>Wind-Speed : {weather.wind.speed} m/s</h3>
          <h3>  Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}</h3>
          <h3>  Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}</h3>
        </div>
      )}

    </div>
  </>
  );
}


import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/weather?city=${city}`);

            setWeather(response.data);
            console.log(response.data)
        
        } catch (err) {
            setError('Failed to fetch weather data');
            setWeather(null);
        }
  };

  return (
    <div className={`min-h-screen ${weather ? 'flex flex-col' : 'flex flex-col items-center justify-center'} bg-blue-100 p-6`}>
        <h1 className={`font-bold ${weather ? 'text-sm' : 'text-4xl'}  mb-6`}>Weather App</h1>
        <input className="placeholder:italic text-justify placeholder:text-slate-400 bg-white border border-slate-200 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-200 focus:ring-sky-300 focus:ring-1 sm:text-sm"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
        />
        <button  className={`bg-blue-500 hover:bg-blue-700 ${weather ? 'text-sm' : 'text-l'} text-white font-bold py-2 px-4 rounded`} onClick={fetchWeather}>Get Weather</button>
        {/* If weather is null or undefined the whole expression will be falsy and React will not render anything.*/}
        {weather && (
        <div>
        <h2 className="text-center">{weather.location.name}</h2>
        <table className="text-sm border-collapse block grid">
            <tr><p>Temperature: {weather.current.temp_c}°C</p></tr>
            <tr><p>Condition: {weather.current.condition.text}</p></tr>
        </table>
        </div>
        )} 
    </div>
  );
};

export default Weather;

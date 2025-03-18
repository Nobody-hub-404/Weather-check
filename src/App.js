import React, { useState } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch weather data for the given location
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!location) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=e46a508dc2aa43629ca53343251302&q=${location}&aqi=yes`
      );
      if (!response.ok) {
        throw new Error("Location not found");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
    setLoading(false);
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Enter location" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      
      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <img 
            src={weatherData.current.condition.icon} 
            alt="Weather icon" 
          />
          <p>Wind: {weatherData.current.wind_kph} km/h</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useState } from "react";
import SearchBar from "./SearchBar";
import TimeDate from "./timeDate";

function CurrentWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = async (city) => {
    try {
      setError("");
      setWeatherData(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <SearchBar onSearch={fetchWeather} />
      {error && <p className="error-message">{error}</p>}

      <div className="row">
        <TimeDate city={weatherData?.name} />
        {weatherData && (
          <div className="current-weather">
            <h2>
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <p>🌡 Temperature: {weatherData.main.temp}°C</p>
            <p>🤔 Feels Like: {weatherData.main.feels_like}°C</p>
            <p>🌥 Weather: {weatherData.weather[0].description}</p>
            <p>💧 Humidity: {weatherData.main.humidity}%</p>
            <p>💨 Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CurrentWeather;

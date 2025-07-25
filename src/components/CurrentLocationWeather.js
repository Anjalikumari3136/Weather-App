import React, { useState } from "react";

const CurrentLocationWeather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getCurrentWeather = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          );
          const data = await response.json();
          if (data.cod === 200) {
            setWeather(data);
            setError("");
          } else {
            setError("Unable to fetch weather data.");
          }
        } catch (err) {
          setError("Network error occurred.");
        }
      },
      () => {
        setError("Location access denied.");
      }
    );
  };

  return (
    <div className="weather-card">
      <button className="location-btn" onClick={getCurrentWeather}>
       Get Current Location Weather 🌍
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <>
          <h2>{weather.name}</h2>
          <h3>{weather.main.temp}°C</h3>
          <p>Feels like : {weather.main.feels_like}°C</p>
          <p>{weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
};

export default CurrentLocationWeather;

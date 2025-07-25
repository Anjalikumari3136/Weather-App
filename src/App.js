import React from "react";
import CurrentWeather from "./components/CurrentWeather";
import "./App.css";
import CurrentLocationWeather from "./components/CurrentLocationWeather";

function App() {
  return (
    <>
    <div className="app-container">
    <h2 className="heading">🌤️  Weather Forecast
    Get real-time temperature, humidity, wind, and more...... Live Updates</h2>
    <div className="app">
      <CurrentWeather />   
    </div>
    <CurrentLocationWeather />
    </div>
    </>
  );
}

export default App;



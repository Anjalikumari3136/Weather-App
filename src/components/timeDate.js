import React, { useState, useEffect } from "react";

function TimeDate({ city }) {
  const [timezoneOffset, setTimezoneOffset] = useState(19800); 
  const [localTime, setLocalTime] = useState(new Date());
  const [error, setError] = useState(null);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    const fetchOffset = async () => {
      try {
        const selectedCity = city || "Delhi";
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}`
        );

        if (!res.ok) throw new Error("City not found");

        const data = await res.json();
        setTimezoneOffset(data.timezone); 
        setError(null);
      } catch (err) {
        setError("Error fetching time");
      }
    };

    fetchOffset();
  }, [city, API_KEY]);

  useEffect(() => {
    const interval = setInterval(() => {
      const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
      const local = new Date(utc + 1000 * timezoneOffset);
      setLocalTime(local);
    }, 1000);

    return () => clearInterval(interval);
  }, [timezoneOffset]);

  return (
    <div className="time-date">
      <img src="/images/cloudy.png" alt="icon" width="80" />
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          <h2>{localTime.toLocaleTimeString()}</h2>
          <p>{localTime.toLocaleDateString()}</p>
        </>
      )}
    </div>
  );
}

export default TimeDate;


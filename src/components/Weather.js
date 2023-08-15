import { useState } from "react";
import React from "react";
import clear from "./images/clear.png";
import clouds from "./images/clouds.png";
import drizzle from "./images/drizzle.png";
import humidity from "./images/humidity.png";
import mist from "./images/mist.png";
import rain from "./images/rain.png";
import search from "./images/search.png";
import snow from "./images/snow.png";
import wind from "./images/wind.png";

const apiKey = "5a3ff175564d1a2fccea0fedbf3a68a7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const weatherCheck = async () => {
    const response = await fetch(`${apiUrl}&appid=${apiKey}&q=${city}`);
    const data = await response.json();
    setWeatherData(data);
  };

  const handleSearch = () => {
    weatherCheck();
  };

  const getWeatherImage = (weatherImg) => {
    switch (weatherImg) {
      case "rain":
        return rain;
      case "wind":
        return wind;
      case "mist":
        return mist;
      case "snow":
        return snow;
      case "clouds":
        return clouds;
      case "clear":
        return clear;

      default:
        // Return a default image or handle other weather conditions
        return null;
    }
  };

  return (
    <div className="mainBox">
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="searchBtn" onClick={handleSearch}>
          <img src={search} alt="Search" />
        </button>
      </div>

      {weatherData && (
        <div className="detail">
          <img
            className="weatherIcon"
            src={getWeatherImage(weatherData.weather[0].main.toLowerCase())}
            alt={weatherData.weather[0].main}
          />

          <div className="temp">{Math.round(weatherData.main.temp)}°C</div>
          <div className="city">{weatherData.name}</div>

          <div className="other">
            <div>
              <img src={humidity} alt="Humidity" />
              <h3>Humidity</h3>
              <p>{weatherData.main.humidity}%</p>
            </div>
            <div>
              <img src={wind} alt="Wind Speed" />
              <h3>Wind Speed</h3>
              <p>{weatherData.wind.speed} km/h</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;

"use client";
import SearchBar from "@/components/Searchbar";
import axios from "axios";
import React, { useState } from "react";

interface WeatherData {
  city: string;
  current_temperature: number;
  day_night: boolean;
  precipitation: number;
  daily_temp_max: number[];
  daily_temp_min: number[];
}

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("Berlin");
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    setError(""); // Clear previous errors
    try {
      const response = await axios.get("http://localhost:5000/weather", {
        params: { city },
      });
      setWeatherData(response.data);
    } catch (err) {
      setError("Unable to fetch weather data for the specified city.");
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>

      <SearchBar city={city} setCity={setCity} onSearch={fetchWeather} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weatherData && (
        <div>
          <h2>Weather in {weatherData.city}</h2>
          <p>Current Temperature: {weatherData.current_temperature}°C</p>
          <p>{weatherData.day_night ? "Daytime" : "Nighttime"}</p>
          <p>Precipitation: {weatherData.precipitation} mm</p>
          <h3>Daily Temperatures</h3>
          <p>Max: {weatherData.daily_temp_max[0]}°C</p>
          <p>Min: {weatherData.daily_temp_min[0]}°C</p>
        </div>
      )}
    </div>
  );
}

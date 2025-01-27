"use client";

import SearchBar from "@/components/Header";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./weather.css";
import MainCard from "@/components/MainCard";
import DailyCard from "@/components/DailyCard";

interface WeatherData {
  city: string;
  current_temperature: number;
  day_night: boolean;
  precipitation: number;
  daily_temp_max: number[];
  daily_temp_min: number[];
  current_code: number;
  daily_code: number[];
}

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("Berlin");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city.trim()) {
        setError("Please enter a city name.");
        setWeatherData(null);
        return;
      }

      setError("");
      try {
        const response = await axios.get("http://localhost:5000/weather", {
          params: { city },
        });
        setWeatherData(response.data);
      } catch (err) {
        setError("Unable to fetch weather data for the specified city.");
        console.error("Error fetching weather:", err);
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  return (
    <>
      <div>
        <SearchBar city={city} setCity={setCity} />

        {error && <p style={{ color: "red" }}>{error}</p>}

        {!error && weatherData && (
          <div>
            <div className="weather-page">
              <MainCard
                city={city}
                temperature={weatherData.current_temperature}
                weather_code={weatherData.current_code}
              />

              <DailyCard
                dailyTemperatureMax={weatherData.daily_temp_max}
                dailyTemperatureMin={weatherData.daily_temp_min}
                weather_code={weatherData.daily_code}
              />
            </div>

            <p>{weatherData.day_night ? "Daytime" : "Nighttime"}</p>
            <p>Precipitation: {weatherData.precipitation} mm</p>
            <h3>Daily Temperatures</h3>
            <p>
              Today Max: {weatherData.daily_temp_max[0]}°C Min:{" "}
              {weatherData.daily_temp_min[0]}°C
            </p>
            <p>Min: {weatherData.daily_temp_min[0]}°C</p>
            <p>code: {weatherData.current_code}</p>
          </div>
        )}
      </div>
    </>
  );
}

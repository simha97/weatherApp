const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

const app = express();
const PORT = 5000;

const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Weather API Backend is running!");
});

app.get("/weather", async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).send({ error: "Please provide a city name." });
  }
  try {
    // Fetch latitude and longitude for the city
    const geoResponse = await axios.get(
      "https://geocoding-api.open-meteo.com/v1/search",
      {
        params: { name: city },
      }
    );

    if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
      return res.status(404).send({ error: "City not found." });
    }

    const { latitude, longitude } = geoResponse.data.results[0];

    const weatherResponse = await axios.get(
      "https://api.open-meteo.com/v1/forecast",
      {
        params: {
          latitude,
          longitude,
          timezone: "auto",
          current: [
            "temperature_2m",
            "is_day",
            "precipitation",
            "weather_code",
          ],
          daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
        },
      }
    );

    res.json({
      city: geoResponse.data.results[0].name,
      current_temperature: weatherResponse.data.current.temperature_2m,
      current_code: weatherResponse.data.current.weather_code,
      day_night: weatherResponse.data.current.is_day,
      precipitation: weatherResponse.data.current.precipitation,
      daily_temp_max: weatherResponse.data.daily.temperature_2m_max,
      daily_temp_min: weatherResponse.data.daily.temperature_2m_min,
      daily_code: weatherResponse.data.daily.weather_code,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Unable to fetch weather data." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

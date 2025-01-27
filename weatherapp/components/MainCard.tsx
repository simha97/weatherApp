import React from "react";
import "/app/weather.css";
import GetWeatherIcon from "./GetWeatherIcon";

interface MainCardProps {
  city: string;
  temperature: number;
  weather_code: number;
}

export default function MainCard({
  city,
  temperature,
  weather_code,
}: MainCardProps) {
  return (
    <div className="MainCard-container  ">
      <div className="p-5 flex justify-between">
        <h3 className=" text-3xl font-bold text-black">{city}</h3>
        <GetWeatherIcon weather_code={weather_code} />
        <p className="text-3xl font-bold text-black">{temperature}°C</p>
      </div>
    </div>
  );
}

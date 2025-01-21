import React from "react";
import "/app/weather.css";

interface MainCardProps {
  city: string;
  temperature: number;
}

export default function MainCard({ city, temperature }: MainCardProps) {
  return (
    <div className="MainCard-container  ">
      <div className="p-5 flex justify-between">
        <h3 className=" text-3xl font-bold text-black">{city}</h3>
        <p className="text-3xl font-bold text-black">{temperature}°C</p>
      </div>
    </div>
  );
}

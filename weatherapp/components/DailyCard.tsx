import React from "react";
import "/app/weather.css";

interface DailyCardProps {
  dailyTemperatureMax: number[];
  dailyTemperatureMin: number[];
}

export default function DailyCard({
  dailyTemperatureMax,
  dailyTemperatureMin,
}: DailyCardProps) {
  const getDayNames = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const todayIndex = new Date().getDay(); // Get current day index

    // Rotate the array to start with today
    const SortedDays = [
      ...daysOfWeek.slice(todayIndex),
      ...daysOfWeek.slice(0, todayIndex),
    ];

    SortedDays[0] = "Today";

    // Return only the required number of days based on the input length
    return SortedDays.slice(0, dailyTemperatureMax.length);
  };

  const dayNames = getDayNames();

  return (
    <div className="DailyCard-container">
      <p className="m-5 pt-6 font-bold text-xl">This week</p>
      <div className="my-2 mx-5 pb-2">
        {dayNames.map((day, index) => (
          <div key={index}>
            <div className="grid grid-cols-3 gap-4 items-center">
              <p className="text-m  text-black">{day}</p>
              <p>{dailyTemperatureMax[index]}°C</p>
              <p>{dailyTemperatureMin[index]}°C</p>
            </div>
            {index < dayNames.length - 1 && (
              <hr className="my-2 border-gray-190" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

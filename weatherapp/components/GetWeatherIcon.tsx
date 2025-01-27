import Image from "next/image";

interface GetWeatherIconProps {
  weather_code: number;
}

export default function GetWeatherIcon({ weather_code }: GetWeatherIconProps) {
  let weatherDescription = "";

  if ([0, 1].includes(weather_code)) {
    weatherDescription = "clear-sun";
  } else if (weather_code == 2) {
    weatherDescription = "partly-cloudy-sun";
  } else if (weather_code == 3) {
    weatherDescription = "cloud";
  } else if ([45, 48].includes(weather_code)) {
    weatherDescription = "fog";
  } else if ([51, 53, 56, 61, 63, 66].includes(weather_code)) {
    weatherDescription = "rain";
  } else if ([55, 57, 65, 67, 80, 81, 82].includes(weather_code)) {
    weatherDescription = "heavy-rain";
  } else if ([71, 73, 75, 77, 85, 86].includes(weather_code)) {
    weatherDescription = "snow";
  } else if ([95, 96, 99].includes(weather_code)) {
    weatherDescription = "thunderstorm";
  } else {
    weatherDescription = "unknown";
  }

  return (
    <div>
      <Image
        src={`/weatherIcons/${weatherDescription}.png`}
        alt={weatherDescription}
        width={50}
        height={50}
      />
    </div>
  );
}

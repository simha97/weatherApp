import React from "react";

interface SearchBarProps {
  city: string;
  setCity: (city: string) => void; // Function to update the city
  onSearch: () => void; // Function to call when the button is clicked
}

export default function SearchBar({ city, setCity, onSearch }: SearchBarProps) {
  return (
    <div>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)} // Update city state
      />
      <button onClick={onSearch}>Get Weather</button>
    </div>
  );
}

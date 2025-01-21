import React from "react";

interface SearchBarProps {
  city: string;
  setCity: (city: string) => void;
  onSearch: () => void;
}

export default function SearchBar({ city, setCity, onSearch }: SearchBarProps) {
  return (
    <div>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={onSearch}>Get Weather</button>
    </div>
  );
}

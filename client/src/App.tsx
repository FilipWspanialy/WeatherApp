import { useEffect, useState } from "react";

type WeatherData = {
  city: string;
  temperature: string;
  condition: string;
  icon: string;
};

const cities = ["gliwice", "hamburg"];

function App() {
  const [weather, setWeather] = useState<WeatherData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const results = await Promise.all(
          cities.map(async (city) => {
            const res = await fetch(`/weather/${city}`);
            if (!res.ok) throw new Error(`Failed to fetch weather for ${city}`);
            return res.json();
          })
        );
        setWeather(results);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Pogoda</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {weather.length === 0 && !error && <p>Loading...</p>}
      <div style={{ display: "flex", gap: "2rem" }}>
        {weather.map((data) => (
          <div
            key={data.city}
            style={{
              border: "1px solid",
              borderRadius: "8px",
              padding: "1rem",
              minWidth: "200px",
              textAlign: "center",
            }}
          >
            <h2>{data.city}</h2>
            <img src={data.icon} alt={data.condition} />
            <p>{data.temperature}</p>
            <p>{data.condition}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

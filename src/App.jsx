import { useState } from "react";
import Search from "./Search";
import CurrentWeather from "./currentWeather";
import Forecast from "./Forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = async (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const [currentWeatherResponse, forecastResponse] = await Promise.all([
      currentWeatherFetch,
      forecastFetch,
    ]);

    const currentWeatherData = await currentWeatherResponse.json();
    const forecastData = await forecastResponse.json();

    setCurrentWeather({ city: searchData.label, ...currentWeatherData });
    setForecast({ city: searchData.label, ...forecastData });
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;

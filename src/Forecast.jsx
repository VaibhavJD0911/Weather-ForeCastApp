import { useState } from "react";
import "boxicons/css/boxicons.min.css"; // Import Boxicons CSS
import "./forecast.css";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Map weather codes/descriptions to Boxicons
const getWeatherIcon = (weather) => {
  const desc = weather.toLowerCase();

  if (desc.includes("clear")) return "bx bx-sun";
  if (desc.includes("cloud")) return "bx bx-cloud";
  if (desc.includes("rain")) return "bx bx-cloud-rain";
  if (desc.includes("thunder")) return "bx bx-cloud-lightning";
  if (desc.includes("snow")) return "bx bx-cloud-snow";
  if (desc.includes("mist") || desc.includes("fog") || desc.includes("haze"))
    return "bx bx-water";

  return "bx bx-question-mark"; // fallback
};

function Forecast({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  if (!data || !data.list) {
    return <p>Loading forecast...</p>;
  }

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <label className="title">Daily Forecast</label>
      <div className="accordion">
        {data.list.slice(0, 7).map((item, idx) => {
          const iconClass = getWeatherIcon(item.weather[0].description);

          return (
            <div key={idx} className="accordion-item">
              <button className="accordion-button" onClick={() => toggle(idx)}>
                <div className="daily-item">
                  <i className={`${iconClass} icon-small`}></i>
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="min-max">
                    {Math.round(item.main.temp_min)}°C /{" "}
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </div>
              </button>
              {activeIndex === idx && (
                <div className="accordion-panel">
                  <div className="daily-details-grid">
                    <div className="daily-details-grid-item">
                      <span className="detail-label">Pressure</span>
                      <span className="detail-value">
                        {item.main.pressure} hPa
                      </span>
                    </div>
                    <div className="daily-details-grid-item">
                      <span className="detail-label">Humidity</span>
                      <span className="detail-value">
                        {item.main.humidity}%
                      </span>
                    </div>
                    <div className="daily-details-grid-item">
                      <span className="detail-label">Clouds</span>
                      <span className="detail-value">{item.clouds.all}%</span>
                    </div>
                    <div className="daily-details-grid-item">
                      <span className="detail-label">Wind Speed</span>
                      <span className="detail-value">
                        {item.wind.speed} m/s
                      </span>
                    </div>
                    <div className="daily-details-grid-item">
                      <span className="detail-label">Sea Level</span>
                      <span className="detail-value">
                        {item.main.sea_level || "N/A"} m
                      </span>
                    </div>
                    <div className="daily-details-grid-item">
                      <span className="detail-label">Feels Like</span>
                      <span className="detail-value">
                        {Math.round(item.main.feels_like)}°C
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Forecast;

import "./current-weather.css";
import "boxicons/css/boxicons.min.css";

// Map OpenWeather icon codes to Boxicons
const weatherIconMap = {
  "01d": "bx bx-sun",
  "01n": "bx bx-moon",
  "02d": "bx bx-cloud-sun",
  "02n": "bx bx-cloud-moon",
  "03d": "bx bx-cloud",
  "03n": "bx bx-cloud",
  "04d": "bx bx-cloud",
  "04n": "bx bx-cloud",
  "09d": "bx bx-cloud-rain",
  "09n": "bx bx-cloud-rain",
  "10d": "bx bx-cloud-light-rain",
  "10n": "bx bx-cloud-light-rain",
  "11d": "bx bx-cloud-lightning",
  "11n": "bx bx-cloud-lightning",
  "13d": "bx bx-cloud-snow",
  "13n": "bx bx-cloud-snow",
  "50d": "bx bx-water",
  "50n": "bx bx-water",
};

const CurrentWeather = ({ data }) => {
  const iconClass =
    weatherIconMap[data.weather[0].icon] || "bx bx-help-circle"; // fallback icon

  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-description">
            {data.weather[0].description}
          </p>
        </div>
        <i className={`weather-icon ${iconClass}`}></i>
      </div>

      <div className="bottom">
        <p className="temperature">{Math.round(data.main.temp)}°C</p>

        <div className="details-grid">
          <div className="details-item">
            <span className="detail-label">Feels Like</span>
            <span className="detail-value">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className="details-item">
            <span className="detail-label">Wind</span>
            <span className="detail-value">{data.wind.speed} m/s</span>
          </div>
          <div className="details-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{data.main.humidity}%</span>
          </div>
          <div className="details-item">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;

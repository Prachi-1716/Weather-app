import { formatWeatherData } from "../Utils/WeatherUtils";

let style = {
  padding: "0.3rem",
  fontSize: "10px",
};

function getCurrentPositionAsync() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

let fetchData = async (setCurrentWeather, setError, setLoading, setLat, setLon) => {
  setLoading(true);
  try {
    const position = await getCurrentPositionAsync();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    let url = `http://localhost:3000/current-location-weather?lat=${latitude}&lon=${longitude}`;
    let res = await fetch(url);

    let weatherData = await res.json();
    weatherData = await formatWeatherData(weatherData);
    console.log(weatherData);
    setCurrentWeather(weatherData);
    setLat(latitude);
    setLon(longitude);
    window.createMap(latitude, longitude, weatherData.city, setError);
    
  } catch (err) {
    setError(err.message);
  }finally {
      setLoading(false);
  }
};

let CurrentLocationWeather = ({ setCurrentWeather, setError, setLoading, setLat, setLon }) => {
  return (
    <button
      className="me-0 btn btn-outline-dark mt-3 mt-md-0"
      type="button"
      style={style}
      onClick={() => fetchData(setCurrentWeather, setError, setLoading, setLat, setLon)}
    >
      See your current location's Weather
    </button>
  );
};

export { CurrentLocationWeather };

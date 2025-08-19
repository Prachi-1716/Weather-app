let apiKey = import.meta.env.VITE_WEATHER_API_KEY;
import {getCountryCode } from "../WeatherInfo";

let formatWeatherData = (weather) => {
  return {
    feels_like: weather.main.feels_like,
    grnd_level: weather.main.grnd_level,
    humidity: weather.main.humidity,
    pressure: weather.main.pressure,
    sea_level: weather.main.sea_level,
    temp: weather.main.temp,
    temp_max: weather.main.temp_max,
    temp_min: weather.main.temp_min,
    main: weather.weather[0].main,
    wind: weather.wind.speed,
    visibility: weather.visibility,
    dt: weather.dt,
    timezone: weather.timezone,
    city: weather.name,
  };
};


let getDefaultData = async (setError) => {

  let defaultUrl = `http://localhost:3000/`;
  try {
    let defaultRes = await fetch(defaultUrl);
    defaultRes = await defaultRes.json();
    let data = formatWeatherData(defaultRes);
    return data;
  } catch (err) {
    setError(err.message || "An unknown error occurred.");
  }
};
let fetchForecast = async (city, country) => {
  try {
    let code = getCountryCode(country);

    let url = `http://localhost:3000/forcast?city=${city}&country=${code}`;
    console.log(url);
    let res = await fetch(url);
    let result = await res.json();
    if (result.cod !== "200") {
      throw new Error(result.message || "Failed to fetch forecast data");
    }

    let filtered = result.list.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );
    //console.log("filtered", filtered);
    return {daily : filtered, //the cards
    all : result.list} // for displaying chart
  }
   catch (err) {
    throw new Error(err.message || "An unknown error occurred.");
  }
};
export { formatWeatherData, getDefaultData, fetchForecast};

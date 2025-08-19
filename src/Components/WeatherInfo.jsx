import countries from "./Utils/CountryCodes";
import { formatWeatherData } from "./Utils/WeatherUtils";
let apiKey = import.meta.env.VITE_WEATHER_API_KEY;

let getCountryCode = (country) => {
  if (!country || country == undefined || country.length === 0) return "";
  let match = countries.find((c) => {
    return c.name.toLowerCase() === country.toLowerCase();
  });

  return match ? match.code : "";
};

let getCurrentWeatherInfo = async (city, country, setError) => {
  // let [lat, lon] = await getCordinates(city, country);
  let code = getCountryCode(country);

  //let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;
  let url = `http://localhost:3000/current-weather?city=${city}&country=${code}`;
  try {
    let result = await fetch(url);

    if (result.status !== 200) {
      setError("Forecast not found. Please check your location.");
      return;
    }

    result = await result.json();
    console.log(result);
    if (result.cod == 200) {
      let data = await formatWeatherData(result);
      return data;
    }else{
      throw new Error(result.message);
    }
  } catch (err) {
    setError(err.message);
  }
};

export { getCurrentWeatherInfo, getCountryCode };

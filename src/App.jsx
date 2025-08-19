import { useState, useEffect } from "react";
import { Search } from "./Components/Search/Search.jsx";
import { getCurrentWeatherInfo } from "./Components/WeatherInfo.jsx";
import { CurrentWeather } from "./Components/CurrentWeather/currentWeather.jsx";
import { HourlyWeatherForecast } from "./Components/Forecast/HourlyForcast/HourlyWeatherForecast.jsx";
import { WeatherChart } from "./Components/Forecast/weatherChart/WeatherChart.jsx";
import { Alert } from "./Components/alert/alert.jsx";
import {
  getDefaultData,
  fetchForecast,
} from "./Components/Utils/WeatherUtils.jsx";
import { Loader } from "./Components/loader/loader.jsx";
import { Map } from "./Components/map/map.jsx";
import {setBg} from "./setBg.js";

let d = new Date(Date.now()).toLocaleDateString("en-GB");
function App() {
  let [input, setInput] = useState("Mumbai, India");
  let [city, setCity] = useState("Mumbai");
  let [country, setCountry] = useState("India");
  let [dailyForecast, setDailyForecast] = useState([]);
  let [wholeForecast, setwholeForecast] = useState([]);
  let [date, setDate] = useState(d);
  let [currentWeather, setCurrentWeather] = useState({});
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  let [lat, setLat] = useState(0);
  let [lon, setLon] = useState(0);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        let data = await getDefaultData(setError);
        setCurrentWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
 useEffect(()=>{
    if(currentWeather && currentWeather.main){
      setBg(currentWeather.main);
    }
 }, [currentWeather]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        let forcast = await fetchForecast(city, country);
        setDailyForecast(forcast.daily);
        setwholeForecast(forcast.all);
        let url = `http://localhost:3000/coordinates?city=${city}&country=${country}`
        let res = await fetch(url);
        res = await res.json();
        let [latValue, lonValue] = res;
        setLat(latValue);
        setLon(lonValue);

        window.createMap(latValue, lonValue, city, setError);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [city, country]);

  //responsible for deciding which date forcast should be displayed
  let handleDate = (evt) => {
    let date = evt.currentTarget.innerText.split("\n\n")[0].trim();
    setDate(date);
  };

  //search input change
  let handleChange = (evt) => {
    setInput(evt.target.value);
  };

  //after search
  let afterSubmit = async (evt) => {
    evt.preventDefault();

    //bootstrap validation
    if (!evt.target.checkValidity()) {
      evt.target.classList.add("was-validated");
      return;
    }

    // Reset validation class if valid
    evt.target.classList.remove("was-validated");
    let location = input.trim();

    if (location.length === 0) {
      setError("please enter a valid location");
      return;
    }
    setError("");
    let locationParts = location.split(",");
    let cityVar = locationParts[0].trim();
    let countryVar = "";
    if (locationParts.length >= 2)
      countryVar = locationParts[locationParts.length - 1] // the api is setup to get weather based on city but even when peoples add more details like sate so last element selected and for more precise we can find weather info using country and city name
        ? locationParts[1].trim()
        : "";

    setCity(cityVar);
    setCountry(countryVar);

    setLoading(true);
    try {
      let weather = await getCurrentWeatherInfo(cityVar, countryVar, setError);

      setCurrentWeather(weather);
    } catch (err) {
      return setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader loading={loading}></Loader>
      <Search
        input={input}
        handleChange={handleChange}
        afterSubmit={afterSubmit}
        setCurrentWeather={setCurrentWeather}
        setError={setError}
        setLoading={setLoading}
        setLat={setLat}
        setLon={setLon}
      ></Search>

      <div
        className="d-flex justify-content-center"
        style={{ minWidth: "50vw" }}
      >
        <div className="container">
          <Alert error={error}></Alert>
          <CurrentWeather currentWeather={currentWeather} setError={setError} />
          <HourlyWeatherForecast
            dailyForecast={dailyForecast}
            wholeForecast={wholeForecast}
            handleDate={handleDate}
            setError={setError}
          />
          <WeatherChart
            wholeForecast={wholeForecast}
            date={date}
            setError={setError}
          />
          <div>
            <Map></Map>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

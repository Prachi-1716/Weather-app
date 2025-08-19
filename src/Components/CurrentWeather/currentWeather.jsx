import { Data } from "./data.jsx";
import {getWeatherImage} from "../Utils/getImage.jsx";
import { useEffect } from "react";

let style = {
  minHeight: "17rem",
  background: "#fefefe3d",
  //boxShadow: "0 0 3px 5px #9e9a9a41",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
};
let CurrentWeather = ({currentWeather , setError}) => {
  if(currentWeather == undefined) return;
  let imageSrc = getWeatherImage(`${currentWeather.main}.png`);

useEffect(() => {
  if (getWeatherImage(`${currentWeather.main}.png`) === "") {
    setError("Image not found");
  } else {
    setError("");
  }
}, [currentWeather.main]);

const localDate = new Date(currentWeather.dt * 1000);

// Get time in HH:MM format
const hours = localDate.getUTCHours().toString().padStart(2, '0');
const minutes = localDate.getUTCMinutes().toString().padStart(2, '0');

const localTime = `${hours}:${minutes}`;

  return (
    <div className="row mt-3">
      <div className="col col-md-10 col-lg-8 col-xxl-6 p-2 mt-3 m-auto" style={style}>

        <h6>Current Weather</h6>
        <span>{currentWeather.city}</span>
        <p>{localDate.toString().split(" ").slice(0, 4).join(" ")}   {localTime}</p>
        <div className="col-12 d-flex flex-wrap align-items-center gap-3">
          {imageSrc != "" ? <img src={imageSrc} alt="Weather Image" style={{ height: "75px" }} />: ""}
          <span className=" ms-3" style={{ fontSize: "35px" }}>
            {currentWeather.temp}°C
          </span>
          <div className="ms-3 mt-4" style={{ minWidth: "8rem" }}>
            <b>{currentWeather.main}</b> <br />
            <p className="mt-2" style={{ fontSize: "12px" }}>
              Feels Like {currentWeather.feels_like}
            </p>
          </div>
        </div>

        <div className="col-12 mt-3">
          <p>{currentWeather.description}</p>
        </div>

        <div className="col-12 d-flex flex-wrap">
          <Data property="Min Temp" value={currentWeather.temp_min} unit="°C"></Data>
          <Data property="Max Temp" value={currentWeather.temp_max} unit="°C"></Data>
          <Data property="Wind" value={currentWeather.wind} unit="km/hr"></Data>
          <Data property="Pressure" value={currentWeather.pressure} unit="hPa"></Data>
          <Data property="Humidity" value={currentWeather.humidity} unit="%"></Data>
          <Data
            property="Sea Level"
            value={currentWeather.sea_level}
            unit="hPa"
          ></Data>
        </div>
      </div>
    </div>
  );
};

export { CurrentWeather };

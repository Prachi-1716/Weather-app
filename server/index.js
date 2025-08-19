const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const e = require("express");
const wrapAsync = require("./wrapAsync.js");
//const fetch = require("node-fetch");

const port = 3000;
let apiKey = process.env.WEATHER_API_KEY;

app.listen(port, () => {
  console.log("listening from port: ", port);
});

app.use(cors());

app.get(
  "/",
  wrapAsync(async (req, res, next) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=Mumbai,IN&appid=${apiKey}&units=metric`;

    let response = await fetch(url);
    response = await response.json();
    return res.send(response);
  })
);

app.get(
  "/current-weather",
  wrapAsync(async (req, res, next) => {
    let { city, country } = req.query;

    if (city === "" || city === undefined) return res.status(501).send({ message: "Invalid location" });
    let query = country ? `${city},${country}` : city;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;

    let response = await fetch(url);
    response = await response.json();
    return res.send(response);
  })
);

app.get(
  "/current-location-weather",
  wrapAsync(async (req, res, next) => {
    let { lat, lon } = req.query;

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    let response = await fetch(url);
    response = await response.json();
    return res.send(response);
  })
);

app.get(
  "/forcast",
  wrapAsync(async (req, res, next) => {
    let { city, country } = req.query;
    console.log("forcast");

    let query = country ? `${city},${country}` : city;
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${apiKey}&units=metric`;

    let response = await fetch(url);
    response = await response.json();
    return res.send(response);
  })
);

app.get("/coordinates", wrapAsync(async(req, res, next) => {
  let { city, country } = req.query;
  let query = country == "" ? city : `${city},${country}`;
  let url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${apiKey}`;
  let result = await fetch(url);
  result = await result.json();
  let latValue = result[0].lat;
  let lonValue = result[0].lon;
  return res.send([latValue, lonValue]);
}));

app.use((err, req, res, next) => {
  res.status(500).send({ message: "Failed to fetch weather data", details: err.message });
});

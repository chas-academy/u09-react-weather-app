import React, { useState, useEffect } from 'react';
import axios from 'axios';
var moment = require('moment');

export const MainCard = () => {


  const [weather, setWeather] = useState({
    location: null,
    country: null,
    temperature: 0.0,
    description: null,
    wind_speed: null,
    humidity: null,
    sunrise: null,
    sunset: null,
    icon: null,
  });

  const [ units, setUnits ] = useState("metric");

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude);
      console.log(longitude);

      if (navigator.geolocation) {
        console.log("Geolocation")
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=5a274b56354a707ffc91ac0c8eec0c72`)
          .then(res => setWeather({
            location: res.data.city.name,
            country: res.data.city.country,
            temperature: Math.floor(res.data.list[0].main.temp),
            description: res.data.list[0].weather[0].main,
            wind_speed: res.data.list[0].wind.speed,
            humidity: res.data.list[0].main.humidity,
            sunrise: moment.unix(res.data.city.sunrise).format("HH:MM"),
            sunset: moment.unix(res.data.city.sunset).format("HH:MM"),
            icon: res.data.list[0].weather[0].id,
          }))
      }
    }, function (error) {
      console.log("No Geolocation")
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=berlin&units=metric&appid=5a274b56354a707ffc91ac0c8eec0c72`)
        .then(res => setWeather({
          location: res.data.city.name,
          country: res.data.city.country,
          temperature: Math.floor(res.data.list[0].main.temp),
          description: res.data.list[0].weather[0].main,
          wind_speed: res.data.list[0].wind.speed,
          humidity: res.data.list[0].main.humidity,
          sunrise: moment.unix(res.data.city.sunrise).format("HH:MM"),
          sunset: moment.unix(res.data.city.sunset).format("HH:MM"),
          icon: res.data.list[0].weather[0].id,
        }))
    })

  }, [units])

  return (
    <div>
      <div className="container mt-3 bg-light text-center">
        <div className="container d-flex col-3 text-center mt-4">
          <h1 className="display-4 ">{weather.temperature}<sup>o</sup> {(units == "metric" ? "C" : "F")} <br>
          </br>{weather.description}</h1>
          <i className = {` container display-1 owf owf-${weather.icon} owf-5x `}></i>
          {/*   <i className= {`wi ${weatherIcon[icon]} container display-1`}></i> */}
        </div>
        <h4 className="display-5">{weather.location}, {weather.country}</h4>
        <br></br>
        <div className="btn-container">
                    <button className = "btn btn-info mr-2"onClick={() => setUnits("metric")}>Celcius</button>
                    <button className = "btn btn-info " onClick={() => setUnits("imperial")}>Fahrenheit</button>
                </div>

        <div className="row">
          <div className="col-md-3 mt-4 text-center">
            <p><b>Wind Force</b></p>
            <h2>{weather.wind_speed} km/hr</h2>
          </div>

          <div className="col-md-3 text-center">
            <br></br>
            <p><b>Sunrise</b></p>
            <h2>{weather.sunrise}</h2>
          </div>

          <div className="col-md-3 text-center">
            <br></br>
            <p><b>Sunset</b></p>
            <h2>{weather.sunset}</h2>
          </div>

          <div className="col-md-3 text-center">
            <br></br>
            <p><b>Humidity</b></p>
            <h2>{weather.humidity}%</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

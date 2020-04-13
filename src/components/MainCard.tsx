import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePosition } from 'use-position';
var moment = require('moment');

export const MainCard = () => {


  const [weather, setWeather] = useState({
    location: null,
    country: null,
    temperature: null,
    description: null,
    wind_speed: null,
    humidity: null,
    sunrise: null,
    sunset: null,
    icon: null,
  });


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let { latitude, longitude } = position.coords;
      if (!navigator.geolocation) {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=509cfcbddeec47511025951278d57f93`)
          .then(res => setWeather({
            location: res.data.city.name,
            country: res.data.city.country,
            temperature: res.data.list[0].main.temp,
            description: res.data.list[0].weather[0].main,
            wind_speed: res.data.list[0].wind.speed,
            humidity: res.data.list[0].main.humidity,
            sunrise: moment.unix(res.data.city.sunrise).format("HH:MM"),
            sunset: moment.unix(res.data.city.sunset).format("HH:MM"),
            icon: res.data.list[0].weather[0].main,
          }))
          .catch(err => {
            console.log(err)
          })
      } else {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=135&units=metric&appid=509cfcbddeec47511025951278d57f93`)
          .then(res => setWeather({
            location: res.data.city.name,
            country: res.data.city.country,
            temperature: res.data.list[0].main.temp,
            description: res.data.list[0].weather[0].main,
            wind_speed: res.data.list[0].wind.speed,
            humidity: res.data.list[0].main.humidity,
            sunrise: moment.unix(res.data.city.sunrise).format("HH:MM"),
            sunset: moment.unix(res.data.city.sunset).format("HH:MM"),
            icon: res.data.list[0].weather[0].main,
          }))
          .catch(err => {
            console.log(err)
          })
      }
    })
  }, [])

  console.log(weather)


  return (
    <div>{weather.sunset}</div>

  );
}

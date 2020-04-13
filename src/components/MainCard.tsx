import React, {useState, useEffect } from 'react';
import { usePosition } from 'use-position';
import axios from 'axios';
var moment = require('moment');

export const MainCard =  () =>  {
  
  const [ weather, setWeather ] = useState({
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
  const { latitude, longitude } = usePosition(true);
  
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=135&units=metric&appid=509cfcbddeec47511025951278d57f93`;
    axios.get(url)
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
  }, [])
 

  return (
    <div>hej</div>
    
  );
}

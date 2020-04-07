import { usePosition } from 'use-position';
import React, { Fragment, Component } from 'react';
import Axios from 'axios';

var moment = require('moment');

export const Geolocation = () => {

  //default latitude and longitude
  const defLat = 35;
  const defLon = 139;

  //usePosition() hook implemented to get position. Use (true) In case browser detects geolocation change the latitude, longitude.

  const { latitude, longitude, error } = usePosition();
  


if (latitude != null || longitude != null) {
  Axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=5a274b56354a707ffc91ac0c8eec0c72`)
  .then(res => {
     let weatherData = {
      location: res.data.city.name,
      country: res.data.city.country,
      temperature: Math.floor(res.data.list[0].main.temp),
      description: res.data.list[0].weather[0].main,
      wind_speed: res.data.list[0].wind.speed,
      humidity: res.data.list[0].main.humidity,
      sunrise: moment.unix(res.data.city.sunrise).format("HH:MM"),
      sunset: moment.unix(res.data.city.sunset).format("HH:MM"),
    }
  })


      return (
        <code>
        latitude: {latitude}<br />
        longitude: {longitude}<br />
        error: "Geolocation"
      </code>
    )

  } else {
    Axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${defLat}&lon=${defLon}&units=metric&appid=5a274b56354a707ffc91ac0c8eec0c72`)
      .then(res => {
        let weatherData = {
          location: res.data.city.name,
          country: res.data.city.country,
          temperature: Math.floor(res.data.list[0].main.temp),
          description: res.data.list[0].weather[0].main,
          wind_speed: res.data.list[0].wind.speed,
          humidity: res.data.list[0].main.humidity,
          sunrise: moment.unix(res.data.city.sunrise).format("HH:MM"),
          sunset: moment.unix(res.data.city.sunset).format("HH:MM"),
        }
      })
    return (
      <code>
        latitude: {defLat}<br />
        longitude: {defLon}<br />
        error: "Error, no Geolocation"
      </code>
    )
  }
}; 




/* class Geolocation extends React {




    state = {
        coords: {
          latitude: 39,
          longitude: 139,
        },
        data: {}
      }

    componentDidMount() {
        // Get device geolocation
        if ( navigator.geolocation) {

          console.log("Supported");

          navigator.geolocation.getCurrentPosition((position) => {
            let newCoords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }
            this.setState({ coords: newCoords });
            console.log(newCoords);

            Axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.coords.latitude}&lon=${this.state.coords.longitude}&units=metric&appid=5a274b56354a707ffc91ac0c8eec0c72`)
            .then(res => {
              console.log(res);
              let weatherData = {
                location: res.data.city.name,
                country: res.data.city.country,
                temperature: Math.floor(res.data.list[0].main.temp),
                description: res.data.list[0].weather[0].main,
                wind_speed: res.data.list[0].wind.speed,
                humidity: res.data.list[0].main.humidity,
                sunrise: moment.unix(res.data.city.sunrise).format("HH:MM"),
                sunset: moment.unix(res.data.city.sunset).format("HH:MM"),
              }

              this.setState({ data: weatherData });
              console.log(weatherData);

            })

          })
        } else {
          console.log('Geolocation Not Supported');
          Axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=stockholm&units=metric&appid=5a274b56354a707ffc91ac0c8eec0c72&query=
          ${this.state.coords.latitude}, ${this.state.coords.longitude}`).then(res => {
            console.log(res);

            let weatherData = {
              location: res.data.city.name,
              country: res.data.city.country,
              temperature: res.data.list[0].main.temp,
              description: res.data.list[0].weather[0].main,
              wind_speed: res.data.list[0].wind.speed,
              humidity: res.data.list[0].main.humidity,
              sunrise: res.data.city.sunrise,
              sunset: res.data.city.sunset,
            }

          })

        }
        const { temperature, description, location, country, wind_speed, sunrise, sunset, humidity, } = weatherData;
        return (
            <div>
                <div className="row card bg-light text-center">
                    <div className="">
                        <h1>{temperature}<sup>o</sup>C<br></br>{description}</h1>
                        <h4>{location}, {country}</h4>
                    </div>
                </div>
                <br></br>

                <div className="row">
                    <div className="col-md-3 text-center">
                        <p><b>Wind Force</b>(km/hr)</p>
                        <h2>{wind_speed}</h2>
                    </div>

                    <div className="col-md-3 text-center">
                        <br></br>
                        <p><b>Sunrise</b>(millibar)</p>
                        <h2>{sunrise}</h2>
                    </div>

                    <div className="col-md-3 text-center">
                        <br></br>
                        <p><b>Sunset</b>(mm)</p>
                        <h2>{sunset}</h2>
                    </div>

                    <div className="col-md-3 text-center">
                        <br></br>
                        <p><b>Humidity</b>(%)</p>
                        <h2>{humidity}</h2>
                    </div>

                </div>
            </div>
        )
      }

    }
      */
    

export default Geolocation; 
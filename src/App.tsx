import React, { Fragment, Component } from 'react';
import Header from './components/Header';
import Forecast from './components/Forecast';
import Card from './components/Card'
import Axios from 'axios';
import UserLocation from './components/UserLocation';
var moment = require('moment');

export default class App extends React.Component {

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
  }


  render() {
    return (
      <main >
        <Header />
        <section className="d-flex flex-row justify-content-center">
          {/*   <Test /> */}
          <UserLocation weatherData={this.state.data} />
        </section>

      </main>

    );

  }

}

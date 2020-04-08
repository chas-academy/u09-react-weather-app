import React from 'react';
import Axios from 'axios';
import UserLocation from './UserLocation';
import { usePosition } from 'use-position';
var moment = require('moment');

export default class Card extends React.Component {

  state = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
    data: {}
  }

  componentDidMount() {

    navigator.geolocation.getCurrentPosition((position) => {
      let newCoords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
      this.setState({ coords: newCoords });
      console.log(newCoords.latitude);

      // Get device geolocation
      if (newCoords.latitude !== null) {
        Axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=stockholm&units=metric&appid=5a274b56354a707ffc91ac0c8eec0c72&query=
        ${this.state.coords.latitude}, ${this.state.coords.longitude}`).then(res => {
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
          this.setState({ data: weatherData });
        })
      }
    });
  }

  render() {
    return (
      <UserLocation weatherData={this.state.data} />
    );
  }
}









/*   // Props: day, key(index)

  render() {
    let newDate = new Date();
    const weekday = this.props.day.dt * 1000
    newDate.setTime(weekday)

    const imgURL = "owf owf-2x owf-"+ this.props.day.weather[0].id +" owf-5x red"

    // const farenheit = (parseInt(this.props.day.main.temp) - 273.15) * (9/5) + 32


    return (
      <div className="col-md-2 d-inline-flex align-content-end jumbotron">
        <div className="card bg-light text-center">
          <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
          <p className="text-muted">{moment(newDate).format('MMMM Do, H:MM')}</p>
          <i className = {imgURL}></i>
          <h2>{Math.round(this.props.day.main.temp)} °C</h2>
          <div className="card-body">
            <p className="card-text">{this.props.day.weather[0].description}</p>
            <p className="card-text">Feels like: {this.props.day.main.feels_like}</p>
            <p className="card-text">Wind force: {this.props.day.wind.speed}</p>
            <p className="card-text">Humidity: {this.props.day.main.humidity}</p>
          </div>
        </div>
      </div>
    )
  }
} */

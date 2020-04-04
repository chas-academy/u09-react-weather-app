import React from 'react';
import './Card.css';
var moment = require('moment');

class Card extends React.Component {
  // Props: day, key(index)

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
}

export default Card
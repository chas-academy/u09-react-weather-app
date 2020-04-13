import React from 'react';
import Axios from 'axios';
import UserLocation from './UserLocation';

var moment = require('moment');

export default class Card extends React.Component {
  
  state = {
    coords: {
      latitude: null,
      longitude: null,
    },
    data: {}
  }

  componentDidMount() {

    //cache this so it can be used inside a callback function
    let currenComponent = this;

    //gets permisions from geolocation
    navigator.permissions.query({
      name: 'geolocation'
    }).then(function (result) {

      if (result.state == 'granted') {
        console.log("Granted");

        navigator.geolocation.getCurrentPosition((position) => {
          let newCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
          currenComponent.setState({ coords: newCoords });
          console.log("Geolocation Supported");

          Axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${currenComponent.state.coords.latitude}&lon=${currenComponent.state.coords.longitude}&units=metric&appid=5a274b56354a707ffc91ac0c8eec0c72`)
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
                icon: res.data.list[0].weather[0].main,
              }



              currenComponent.setState({ data: weatherData });

              get_WeatherIcon(weatherData.icon, res.data.list[0].weather[0].icon);

              function get_WeatherIcon(icons, rangeId) {
                switch (true) {
                  case rangeId >= 200 && rangeId < 232:
                    currenComponent.setState({ icon: icons.Thunderstorm });
                    break;
                  case rangeId >= 300 && rangeId <= 321:
                    currenComponent.setState({ icon: icons.Drizzle });
                    break;
                  case rangeId >= 500 && rangeId <= 521:
                    currenComponent.setState({ icon: icons.Rain });
                    break;
                  case rangeId >= 600 && rangeId <= 622:
                    currenComponent.setState({ icon: icons.Snow });
                    break;
                  case rangeId >= 701 && rangeId <= 781:
                    currenComponent.setState({ icon: icons.Atmosphere });
                    break;
                  case rangeId === 800:
                    currenComponent.setState({ icon: icons.Clear });
                    break;
                  case rangeId >= 801 && rangeId <= 804:
                    currenComponent.setState({ icon: icons.Clouds });
                    break;
                  default:
                    currenComponent.setState({ icon: icons.Clouds });
                }
              }
            });

        })

      } else if (result.state !== 'granted') {
        console.log("No Granted");

        console.log('Geolocation Not Supported')
        Axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=berlin&units=metric&appid=5a274b56354a707ffc91ac0c8eec0c72`)
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
              icon: res.data.list[0].weather[0].main,
              str: res.data.list[0].weather[0].description,
            }
            
            currenComponent.setState({ data: weatherData });

            get_WeatherIcon(weatherData.icon, res.data.list[0].weather[0].id);

            function get_WeatherIcon(icons, rangeId) {
              switch (true) {
                case rangeId >= 200 && rangeId < 232:
                  currenComponent.setState({ icon: icons.Thunderstorm });
                  break;
                case rangeId >= 300 && rangeId <= 321:
                  currenComponent.setState({ icon: icons.Drizzle });
                  break;
                case rangeId >= 500 && rangeId <= 521:
                  currenComponent.setState({ icon: icons.Rain });
                  break;
                case rangeId >= 600 && rangeId <= 622:
                  currenComponent.setState({ icon: icons.Snow });
                  break;
                case rangeId >= 701 && rangeId <= 781:
                  currenComponent.setState({ icon: icons.Atmosphere });
                  break;
                case rangeId === 800:
                  currenComponent.setState({ icon: icons.Clear });
                  break;
                case rangeId >= 801 && rangeId <= 804:
                  currenComponent.setState({ icon: icons.Clouds });
                  break;
                default:
                  currenComponent.setState({ icon: icons.Clouds });
              }
            }

          })
      }
    })

  }

  render() {
    return (
      <UserLocation weatherData={this.state.data} />
    );
  }
}

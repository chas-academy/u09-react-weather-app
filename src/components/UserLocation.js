import React, {reading} from 'react';
import 'weather-icons/css/weather-icons.css';

export default function UserLocation(props) {

    
    const { temperature, description, location, country, wind_speed, sunrise, sunset, humidity, icon } = props.weatherData;
    


    const weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };

    


    return (
        <div>
            <div className="container mt-3 bg-light text-center">
                <div className="container d-flex col-3 text-center mt-4">
                    <h1 className="display-4">{temperature}<sup>o</sup>C <br>
                    </br>{description}</h1> 
                        <i className= {`wi ${weatherIcon[icon]} container display-1`}></i>
                </div>
                    <h4 className="display-5">{location}, {country}</h4>
            <br></br>

            <div className="row">
                <div className="col-md-3 mt-4 text-center">
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
        </div>
    )
}

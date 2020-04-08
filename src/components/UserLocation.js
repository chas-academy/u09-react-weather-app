import React from 'react';


export default function UserLocation(props) {


    const { temperature, description, location, country, wind_speed, sunrise, sunset, humidity, } = props.weatherData;


    return (
        <div>
            <div className="row card bg-light text-center">
                <div className="">
                    <h1>{temperature}<sup>o</sup>C<br></br>{description}</h1>
                    <h4>{location}, {country}</h4>
                </div>
            
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

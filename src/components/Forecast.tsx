import React, { Component } from 'react';

// Interface for forecast State.
interface ForecastState {
    weather: any,
    isLoaded: boolean,
    units: string,
    geolocation: any
}

interface ForecastProps {
    units: string
}

// Interface for how data for 3hours interval should look like.
interface Hour {
    main: any,
    dt: number,
    dt_txt: string,
    weather: any
}

class Forecast extends Component<ForecastProps, ForecastState> {

    // Emil API Key, can be switched out to your own.
    private APIKey = '5a274b56354a707ffc91ac0c8eec0c72';

    // Constructs class with default values to render page with.
    constructor(props: ForecastProps) {
        super(props);
        this.state = {

            weather: {
                list: [
                    {
                        dt_txt: "",
                    }
                ]
            },
            isLoaded: false,
            units: 'imperial',
            geolocation: {
                lat: null,
                lon: null
            }
        }
    }

    getPosition = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }


    getWeather = async (latitude: any, longitude: any) => {

        if (longitude != null || latitude != null) {
            if (this.state.units === 'metric') {
                const api_call = await
                    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${this.APIKey}&units=metric`);
                const data = await api_call.json();
                this.setState({
                    weather: data,
                    isLoaded: true
                })
            } else if (this.state.units === 'imperial') {
                const api_call = await
                    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${this.APIKey}&units=imperial`);
                const data = await api_call.json();
                this.setState({
                    weather: data,
                    isLoaded: true
                })
            } else {
                const api_call = await
                    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${this.APIKey}`);
                const data = await api_call.json();
                this.setState({
                    weather: data,
                    isLoaded: true
                })
            }

        } else {
            if (this.state.units === 'metric') {
                const api_call = await
                    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=berlin&units=metric&appid=${this.APIKey}`);
                const data = await api_call.json();
                this.setState({
                    weather: data,
                    isLoaded: true
                })
            } else if (this.state.units === 'imperial') {
                const api_call = await
                    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=berlin&units=imperial&appid=${this.APIKey}`);
                const data = await api_call.json();
                this.setState({
                    weather: data,
                    isLoaded: true
                })
            } else {
                const api_call = await
                    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=berlin&appid=${this.APIKey}`);
                const data = await api_call.json();
                this.setState({
                    weather: data,
                    isLoaded: true
                })
            }

        }

    }

    // Function activates when component is rendered.
    componentDidMount() {

        this.getPosition()
            .then((position: any) => {
                this.getWeather(
                    position.coords.latitude,
                    position.coords.longitude)
            }
            )
            .catch(() => {
                this.getWeather(null, null)
                    .then(() => console.log("Error: User denied location, defaulting to Berlin."))
            });
    }

    // Function that renders the component.
    render() {

        if (this.state.units !== this.props.units) {
            this.setState({
                units: this.props.units
            })
            this.getPosition()
            .then((position: any) => {
                this.getWeather(
                    position.coords.latitude,
                    position.coords.longitude)
            }
            )
            .catch(() => {
                this.getWeather(null, null)
                    .then(() => console.log("Error: User denied location, defaulting to Berlin."))
            });
        }

        // Defines variables for function.
        var { isLoaded, weather } = this.state;
        var units = 'K';
        var d = new Date();
        var h = d.getHours();

        // Checks what units we're using to display correct letter after the degrees.
        if (this.state.units === 'metric') {
            units = 'C';
        } else if (this.state.units === 'imperial') {
            units = 'F';
        }

        function getDate(date: any) {
            var mm = date.getMonth() + 1; // getMonth() is zero-based
            var dd = date.getDate();

            return [date.getFullYear(),
            (mm > 9 ? '' : '0') + mm,
            (dd > 9 ? '' : '0') + dd
            ].join('-');
        };

        var today: any = new Date();
        today = getDate(today);

        var tomorrow: any = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow = getDate(tomorrow);


        var day3: any = new Date(today)
        day3.setDate(day3.getDate() + 2)
        day3 = getDate(day3);

        var day4: any = new Date(today)
        day4.setDate(day4.getDate() + 3)
        day4 = getDate(day4);

        var day5: any = new Date(today)
        day5.setDate(day5.getDate() + 4)
        day5 = getDate(day5);


        today = weather.list.filter((time: any) => time.dt_txt.includes(today));
        tomorrow = weather.list.filter((time: any) => time.dt_txt.includes(tomorrow));
        day3 = weather.list.filter((time: any) => time.dt_txt.includes(day3));
        day4 = weather.list.filter((time: any) => time.dt_txt.includes(day4));
        day5 = weather.list.filter((time: any) => time.dt_txt.includes(day5));


        // Checks if page is loaded or not and renders out the weather if is loaded and renders just a loading screen if not/until loaded.
        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            // Console logs weather for debugging purpose.
            return (
                <div className="Forecast d-flex flex-column align-items-center container">
                    <h3>5 day forecast</h3>
                    <div className="row d-flex align-items-start justify-content-around">
                        {h <= 21  ? <div className="col-md border border-dark rounded">
                            <h5>Date: {today[0].dt_txt.slice(0, 10)}</h5>
                            {today.map((hour: Hour, i: number) => (
                                <div key={i}>
                                    <p>Time: {hour.dt_txt.slice(11)}</p>
                                    <p>Temp: {Math.floor(hour.main.temp)}° {units}<br></br><i className = {`owf owf-${hour.weather[0].id} owf-2x`}></i></p>
                                    <hr />
                                </div>
                            ))}
                        </div> : <div>No More Data Today</div>}
                        <div className="col-md border border-dark rounded">
                            <h5>Date: {tomorrow[0].dt_txt.slice(0, 10)}</h5>
                            {tomorrow.map((hour: Hour, i: number) => (
                                <div key={i}>
                                    <p>Time: {hour.dt_txt.slice(11)}</p>
                                    <p>Temp: {Math.floor(hour.main.temp)}° {units}<br></br><i className = {`owf owf-${hour.weather[0].id} owf-2x`}></i></p>
                                    <hr />
                                </div>
                            ))}
                        </div>
                        <div className="col-md border border-dark rounded">
                            <h5>Date: {day3[0].dt_txt.slice(0, 10)}</h5>
                            {day3.map((hour: Hour, i: number) => (
                                <div key={i}>
                                    <p>Time: {hour.dt_txt.slice(11)}</p>
                                    <p>Temp: {Math.floor(hour.main.temp)}° {units}<br></br><i className = {`owf owf-${hour.weather[0].id} owf-2x`}></i></p>
                                    <hr />
                                </div>
                            ))}
                        </div>
                        <div className="col-md border border-dark rounded">
                            <h5>Date: {day4[0].dt_txt.slice(0, 10)}</h5>
                            {day4.map((hour: Hour, i: number) => (
                                <div key={i}>
                                    <p>Time: {hour.dt_txt.slice(11)}</p>
                                    <p>Temp: {Math.floor(hour.main.temp)}° {units}<br></br><i className = {`owf owf-${hour.weather[0].id} owf-2x`}></i></p>
                                    <hr />
                                </div>
                            ))}
                        </div>
                        <div className="col-md border border-dark rounded">
                            <h5>Date: {day5[0].dt_txt.slice(0, 10)}</h5>
                            {day5.map((hour: Hour, i: number) => (
                                <div key={i}>
                                    <p>Time: {hour.dt_txt.slice(11)}</p>
                                    <p>Temp: {Math.floor(hour.main.temp)}° {units}<br></br><i className = {`owf owf-${hour.weather[0].id} owf-2x`}></i></p>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        }


    }
}

// Exports class to be used in App.tsx.
export default Forecast;


/*   
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({ 
                    geolocation: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude} 
                });
            }
        );

        if (this.state.units === 'metric') {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.geolocation.lat}&lon=${this.state.geolocation.lon}&units=metric&appid=${this.APIKey}`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    weather: json,
                })
            });
        } else if (this.state.units === 'imperial') {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.geolocation.lat}&lon=${this.state.geolocation.lon}&units=imperial&appid=${this.APIKey}`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    weather: json,
                })
            });
        } else {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.geolocation.lat}&lon=${this.state.geolocation.lon}&appid=${this.APIKey}`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    weather: json,
                })
            });
        }

         
        // Checks if we have any geolocation or not and executes API call with coordinates if there is any otherwise defaults to Stockholm.
        if (this.state.geolocation.lat != null || this.state.geolocation.lon != null) {
            if (this.state.units === 'metric') {
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.geolocation.lat}&lon=${this.state.geolocation.lon}&units=metric&appid=${this.APIKey}`)
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        isLoaded: true,
                        weather: json,
                    })
                });
            } else if (this.state.units === 'imperial') {
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.geolocation.lat}&lon=${this.state.geolocation.lon}&units=imperial&appid=${this.APIKey}`)
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        isLoaded: true,
                        weather: json,
                    })
                });
            } else {
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.geolocation.lat}&lon=${this.state.geolocation.lon}&appid=${this.APIKey}`)
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        isLoaded: true,
                        weather: json,
                    })
                });
            }  
        } else if (this.state.geolocation.lat === null || this.state.geolocation.lon === null) {
            // Checks what units we want to use and then executes API call with those units.
                if (this.state.units === 'metric') {
                    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=berlin&units=metric&appid=${this.APIKey}`)
                    .then(res => res.json())
                    .then(json => {
                        this.setState({
                            isLoaded: true,
                            weather: json,
                        })
                    });
                } else if (this.state.units === 'imperial') {
                    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=berlin&units=imperial&appid=${this.APIKey}`)
                    .then(res => res.json())
                    .then(json => {
                        // If API call works then sets isLoaded to true so we know it's done and stores the result of API call in weather.
                        this.setState({
                            isLoaded: true,
                            weather: json,
                        })
                    });
                } else {
                    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=berlin&appid=${this.APIKey}`)
                    .then(res => res.json())
                    .then(json => {
                        this.setState({
                            isLoaded: true,
                            weather: json,
                        })
                    });
            }  
        }  
        */   
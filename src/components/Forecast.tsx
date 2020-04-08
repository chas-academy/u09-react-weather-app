import React, { Component } from 'react';

// Interface for forecast State.
interface forecastState {
    weather: any,
    isLoaded: boolean,
    units: string,
    geolocation: any
}

// Interface for how data for 3hours interval should look like.
interface Hour {
    main: any,
    dt: number,
    dt_txt: string
}

class Forecast extends Component <{}, forecastState> {

    // Emil API Key, can be switched out to your own.
    private APIKey = '5a274b56354a707ffc91ac0c8eec0c72';

    // Constructs class with default values to render page with.
    constructor(props: any) {
        super(props);
        this.state = {
            weather: {
                list: [
                     {
                        dt_txt: ""
                    }
                ]
            },
            isLoaded: false,
            units: 'metric',
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
        if (latitude != null || longitude != null) {
            const api_call = await
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${this.APIKey}&units=metric`);
            const data = await api_call.json();
            this.setState({
                weather: data,
                isLoaded: true
                })
            console.log('data is: ', data.list);  //this is the good stuff
        } else if (latitude === null || longitude === null) {
            const api_call = await
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=berlin&units=metric&appid=${this.APIKey}`);
            const data = await api_call.json();
            this.setState({
                weather: data,
                isLoaded: true
                })
            console.log('data is: ', data.list);  //this is the good stuff
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
            .catch((err) => console.log(err.message));
        
        

   }

   // Function that renders the component.
    render() {

        // Defines variables for function.
        var { isLoaded, weather } = this.state;
        var units = 'K';

        // Checks what units we're using to display correct letter after the degrees.
        if (this.state.units === 'metric') {
            units = 'C';
        } else if (this.state.units === 'imperial') {
            units = 'F';
        }

        var date = new Date();
        var year: any = date.getFullYear();
        var month: any = date.getMonth() + 1;
        var day: any = date.getDate();
        
        if (day < 10) {
             day = `${0}${day}`;
        } 
        
        if (month < 10) {
            month = `${0}${month}`;
        }
        
        var today = year + '-' + month + '-' + day;


        var day1: any = weather.list.filter((time: any) => time.dt_txt.includes(today));
        var day2: any = weather.list.filter((time: any) => time.dt_txt.includes(today + 1));

        // Checks if page is loaded or not and renders out the weather if is loaded and renders just a loading screen if not/until loaded.
        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            // Console logs weather for debugging purpose.
            console.log(weather);
            console.log(today);
            return (
                <div className="Forecast">
                    <h2>{weather.city.name}, {weather.city.country}</h2>
                    <h4>5 day forecast</h4>
                    {day1.map((hour: Hour, i: number) => (
                            <p key={i}>
                                {hour.dt_txt} | {hour.main.temp}° {units}
                            </p>
                        ))}

                        {day2.map((hour: Hour, i: number) => (
                            <p key={i}>
                                {hour.dt_txt} | {hour.main.temp}° {units}
                            </p>
                        ))}
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
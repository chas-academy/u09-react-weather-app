import React, { Component } from 'react';

interface myState {
    weather: any,
    isLoaded: boolean,
    units: string,
}

interface Hour {
    main: any,
    dt: number,
    dt_txt: string
}

class Forecast extends Component <{}, myState> {

    private APIKey = '5a274b56354a707ffc91ac0c8eec0c72';

    constructor(props: any) {
        super(props);
        this.state = {
            weather: [],
            isLoaded: false,
            units: 'metric',
        }
    }

    componentDidMount() {

        if (this.state.units === 'metric') {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=stockholm&units=metric&appid=${this.APIKey}`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    weather: json,
                })
            });
        } else if (this.state.units === 'imperial') {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=stockholm&units=imperial&appid=${this.APIKey}`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    weather: json,
                })
            });
        } else {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=stockholm&appid=${this.APIKey}`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    weather: json,
                })
            });
        }

        

    }


    render() {

        var { isLoaded, weather } = this.state;
        var units = 'K';

        if (this.state.units === 'metric') {
            units = 'C';
        } else if (this.state.units === 'imperial') {
            units = 'F';
        }

        let day1 = this.state.weather.filter((hour: Hour) => {
            return hour.dt_txt.includes('2020-04-03');
        })

        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            console.log(weather.list);
            //console.log(today);
            return (
                <div className="Forecast">
                    <h2>{weather.city.name}, {weather.city.country}</h2>
                    <h4>5 day forecast</h4>
                    {weather.list.map((hour: Hour, i: number) => (
                            <p key={i}>
                                {hour.dt_txt} | {hour.main.temp}° {units}
                            </p>
                        ))}
                </div>
            )
        }

        
    }
}

export default Forecast;
import React, { Component } from 'react';

interface myState {
    weather: any,
    isLoaded: boolean
}

interface Hour {
    main: any,
    dt: number
}

class Forecast extends Component <{}, myState> {

    private APIKey = '5a274b56354a707ffc91ac0c8eec0c72';

    constructor(props: any) {
        super(props);
        this.state = {
            weather: [],
            isLoaded: false,
        }
    }

    componentDidMount() {

        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=stockholm&appid=${this.APIKey}`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    weather: json,
                })
            });

    }


    render() {

        var { isLoaded, weather } = this.state;

        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            console.log(this.state.weather);
            return (
                <div className="Forecast">
                    <h2>{weather.city.name}, {weather.city.country}</h2>
                    <ul>
                        {weather.list.map((hour: Hour) => (
                            <li key={hour.dt}>
                                {hour.main.temp}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }

        
    }
}

export default Forecast;
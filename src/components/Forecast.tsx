import React, { Component } from 'react';
import Card from './Card';

interface myState {
    weather: any,
    isLoaded: boolean,
    units: string
}

interface Hour {
    main: any,
    dt: number,
    dt_txt: string
}

class Forecast extends Component<{}, myState> {

    private APIKey = '5a274b56354a707ffc91ac0c8eec0c72';

    constructor(props: any) {
        super(props);
        this.state = {
            weather: [],
            isLoaded: false,
            units: 'F',
        }
    }

    componentDidMount() {

        if (this.state.units === 'C') {
             fetch(`https://api.openweathermap.org/data/2.5/forecast?q=stockholm&units=metric&appid=${this.APIKey}`)
             .then(res => res.json())
             .then(json => {
                const dailyData = json.list.filter((reading: { dt_txt: string | string[]; }) => reading.dt_txt.includes("18:00:00"))
                this.setState({ weather: dailyData })

            })
         } else if (this.state.units === 'F') {
             fetch(`https://api.openweathermap.org/data/2.5/forecast?q=stockholm&units=imperial&appid=${this.APIKey}`)
             .then(res => res.json())
             .then(json => {
                const dailyData = json.list.filter((reading: { dt_txt: string | string[]; }) => reading.dt_txt.includes("18:00:00"))
                this.setState({ weather: dailyData })

            })
         } else {
             fetch(`https://api.openweathermap.org/data/2.5/forecast?q=stockholm&appid=${this.APIKey}`)
             .then(res => res.json())
             .then(json => {
                const dailyData = json.list.filter((reading: { dt_txt: string | string[]; }) => reading.dt_txt.includes("18:00:00"))
                this.setState({ weather: dailyData,
                                units: "K"
                })

            })
         }
    }



    formatCards = () => {
        return this.state.weather.map((day: any, index: string | number | undefined) => <Card units={this.state.units} day={day} key={index} />)
    }


    render() {

        console.log(this.state.weather);

        return (
            <div>
              {this.formatCards()}
            </div>
          )

    }
}

export default Forecast;
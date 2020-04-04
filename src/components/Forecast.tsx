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
            units: 'metric'
        }
    }

    componentDidMount() {

        /*  if (this.state.units === 'metric') {
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
         } */

        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=stockholm&units=metric&appid=${this.APIKey}`)
            .then(res => res.json())
            .then(json => {
                const dailyData = json.list.filter((reading: { dt_txt: string | string[]; }) => reading.dt_txt.includes("18:00:00"))
                this.setState({ weather: dailyData })

            })
    }



    formatCards = () => {
        return this.state.weather.map((day: any, index: string | number | undefined) => <Card day={day} key={index} />)
    }


    render() {

        return (
            <div>
              {this.formatCards()}
            </div>
          )

    /*     var { isLoaded, weather } = this.state;
        var units = 'K';

        if (this.state.units === 'metric') {
            units = 'C';
        } else if (this.state.units === 'imperial') {
            units = 'F';
        } */

        //var today = weather.list.filter(weather.list.dt_txt === '2020-04-03 18:00:00'); 




    }
}

export default Forecast;
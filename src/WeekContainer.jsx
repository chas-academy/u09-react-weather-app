import React from 'react';
import Card from './components/Card';


const weatherURL = "http://api.openweathermap.org/data/2.5/forecast?q=stockholm,&units=metric&APPID=ffcbca7b13de0beff3ae1bc269dbf6ca"


class WeekContainer extends React.Component {
  state = {
    weather: []
  }

  componentDidMount = () => {
    fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      console.log("Data List Loaded", data.list)
      const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
      this.setState({weather: dailyData})
    })
  }

  formatCards = () => {
    return this.state.weather.map((day, index) => <Card day={day} key={index}/>)
  }

  render() {
    return (
      <div className="container">
      <h1 className="display-1 jumbotron">5-Day Forecast.</h1>
      <h5 className="display-5 text-muted">Stockholm, SE</h5>
        <div className="row justify-content-center">

          {this.formatCards()}

        </div>
      </div>
    )
  }
}

export default WeekContainer
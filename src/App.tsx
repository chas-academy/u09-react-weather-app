import React from 'react';
import Header from './components/Header';
import Forecast from './components/Forecast';
import axios from 'axios';
import { MainCard } from './components/MainCard';

interface AppInterface {
  units: string
  input: string
}

export default class App extends React.Component<{}, AppInterface> {

  constructor(props: any) {
    super(props);
    this.state = {
      units: 'metric',
      input: 'berlin',
    }
  }

  changeRegion(event: any, city: any) {
    if(event.key === 'Enter') {       
      this.setState({
        input: city,
      })
    }
    
  }

  changeWeather(event: any){
    event.preventDefault();
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.input}&units=${this.state.units}&appid=5a274b56354a707ffc91ac0c8eec0c72`)
        .then(res => console.log(res))
  }

  unitChanger(e: any) {
    this.setState({
      units: e.target.value
    })
  }

  render() {
    return (
      <main >
        <Header unitChanger={this.unitChanger.bind(this)}
          units={this.state.units}
          changeRegion={this.changeRegion.bind(this)}
          changeWeather = {this.changeWeather.bind(this)} />
        <MainCard units={this.state.units} input={this.state.input} />
        <Forecast units={this.state.units} />
        <section className="d-flex flex-row justify-content-center">
        </section>
      </main>
    );
  }
}

import React from 'react';
import Header from './components/Header';
import Forecast from './components/Forecast';
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
      input: '',
    }
  }

  changeRegion(event: any, city: any) {
    if (event.key === 'Enter') {
      this.setState({
        input: city,
      })
    }

  }

  changeWeather(event: any) {
    event.preventDefault();
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
          changeWeather={this.changeWeather.bind(this)} />
        <MainCard units={this.state.units}
          input={this.state.input} />
        <Forecast units={this.state.units}
          input={this.state.input} />
        <section className="d-flex flex-row justify-content-center">
        </section>
      </main>
    );
  }
}

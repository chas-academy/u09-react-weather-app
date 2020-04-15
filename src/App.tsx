import React from 'react';
import Header from './components/Header';
import Forecast from './components/Forecast';
import { MainCard } from './components/MainCard';

interface AppInterface {
  units: string
  region: string
}

export default class App extends React.Component<{}, AppInterface> {

  constructor(props: any) {
    super(props);
    this.state = {
      units: 'metric',
      region: 'berlin',
    }
  }

  changeRegion(city: any) {
    this.setState({
      region: city,
    })
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
          changeRegion={this.changeRegion.bind(this)} />
        <MainCard units={this.state.units} region={this.state.region} />
        <Forecast units={this.state.units} />
        <section className="d-flex flex-row justify-content-center">
        </section>
      </main>
    );
  }
}

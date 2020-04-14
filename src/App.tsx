import React from 'react';
import Header from './components/Header';
import Forecast from './components/Forecast';
import { MainCard } from './components/MainCard';


export default class App extends React.Component {

  constructor(props: any) {
    super(props);
    this.state = {
        units: 'metric'
      }
  }

  unitChanger(e: any) {
    this.setState({
      units: e.target.value
    })
  }

  render() {
    return (
      <main >
        <Header unitChanger={this.unitChanger.bind(this)}/>
        <MainCard />
        <Forecast />
        <section className="d-flex flex-row justify-content-center">
        </section>
      </main>
    );
  }
}

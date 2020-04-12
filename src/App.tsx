import React from 'react';
import Header from './components/Header';
import Card from './components/Card';
import Forecast from './components/Forecast';
import { MainCard } from './components/MainCard';


export default class App extends React.Component {



  render() {
    return (
      <main >
        <Header />
       
        <Card />
        <Forecast />
        <section className="d-flex flex-row justify-content-center">
        </section>
      </main>
    );
  }
}

import React, { Fragment, Component } from 'react';
import Header from './components/Header';
import Forecast from './components/Forecast';
import Card from './components/Card'
import Axios from 'axios';
import UserLocation from './components/UserLocation';
import Geolocation from './components/Geolocation';
var moment = require('moment');

export default class App extends React.Component {



  render() {
    return (
      <main >
        <Header />
        <section className="d-flex flex-row justify-content-center">
        < Geolocation /> 
        </section>

      </main>

    );

  }

}

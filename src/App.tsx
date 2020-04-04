import React, { Fragment, Component} from 'react';
import axios from 'axios';
import Header from './components/Header';
import Forecast from './components/Forecast';
import Card from './components/Card'

export default class App extends React.Component {

  state = {

  }

  componentDidMount (){
    // Get device location
    if(navigator.geolocation){
    }else{
      console.log('Not Supported');
    }
  }


  render(){
    return(
      <main >
      <Header/>
      <section className = "d-flex flex-row justify-content-center">
      <Forecast/>
      </section>
      </main>
    );
  }
}

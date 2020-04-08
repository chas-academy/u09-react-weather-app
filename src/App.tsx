import React, { Fragment} from 'react';
import axios from 'axios';
import Days from './days/days';
import Header from './components/Header';
import Forecast from './components/Forecast';

export default class App extends React.Component {

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

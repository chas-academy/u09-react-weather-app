import React, { Fragment} from 'react';
import axios from 'axios';
import Days from './days/days';
import Header from './components/Header';

export default class App extends React.Component {

  componentDidMount (){
    // Get device location
    
  }


  render(){
    return(
      <main>
      <Header/>
      <Days/>
      </main>
    );
  }
}

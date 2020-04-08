import React from 'react';
import Header from './components/Header';
import Card from './components/Card';


export default class App extends React.Component {



  render() {
    return (
      <main >
        <Header />
        <Card />
        <section className="d-flex flex-row justify-content-center">
        </section>
      </main>
    );
  }
}

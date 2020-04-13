import React, { Component } from 'react';

class Header extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            units: 'metric',
            metric: "metric",
            imperial: "imperial"
        }
    }


    unitChanger(e) {
        console.log(e.target.value);
        this.setState({
            units: e.target.value
        })
    }

    
 
    render() {
        return (
            <article>
                <header className = "text-center">
                    <h1>Weather App</h1>
                    <div className="btn-container">
                        <button onClick={(e) => this.unitChanger(e)} value="metric">Celcius</button>
                        <button onClick={(e) => this.unitChanger(e)} value="imperial">Fahrenheit</button>
                    </div>
                </header>
            </article>
        );
    }
    
}

export default Header;
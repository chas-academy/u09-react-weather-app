import React, { Component } from 'react';

interface HeaderProps {
    unitChanger: any,
    units: string
}

class Header extends Component<HeaderProps> {
    
    constructor(props: any) {
        super(props);
    }
    
 
    render() {
        return (
            <article>
                <header className = "text-center">
                    <h1>Weather App</h1>
                    <div className="btn-container">
                            {this.props.units === "metric" ? 
                            <div>
                                <button onClick={(e) => this.props.unitChanger(e)} value="metric" className="btn btn-light">Celcius</button>
                                <button onClick={(e) => this.props.unitChanger(e)} value="imperial" className="btn btn-dark">Fahrenheit</button>
                            </div> :
                            <div>
                                <button onClick={(e) => this.props.unitChanger(e)} value="metric" className="btn btn-dark">Celcius</button>
                                <button onClick={(e) => this.props.unitChanger(e)} value="imperial" className="btn btn-light">Fahrenheit</button>
                            </div> }
                            <p>{this.props.units}</p>              
                    </div>
                </header>
            </article>
        );
    }
    
}

export default Header;
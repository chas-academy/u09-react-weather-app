import React from 'react';

const Header = props => {

    return (
        <article>
            <header className = "text-center">
                <h1>Weather App</h1>
                <div className="btn-container">
                    <button className = "btn btn-info mr-2" onClick={(e) => {}}>Celcius</button>
                    <button className = "btn btn-info ">Fahrenheit</button>
                </div>
            </header>
        </article>
    );
}

export default Header;